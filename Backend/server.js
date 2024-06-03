const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Model/user');
const  TempleModel = require('./Model/temple');
const routes = require('./routes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Prashanth:Prash%402005@cluster0.o3hncd3.mongodb.net/Godsowncountry");
// Routes
app.use('/', routes);

// Additional route

app.get('/getusers', async (req, res) => {
    try {
        const users = await UserModel .find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/temples', (req, res) => {
    TempleModel.find()
    .then(temples => res.json(temples))
    .catch(err => console.log(err));
});

app.get('/getusers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel .findById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/updateUsers/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req.body,id);
    try {
        const { name, email, age, password, places } = req.body; // Extract places from the request body

        const updatedUser = await UserModel .findByIdAndUpdate(
            id,
            req.body , // Add place and experiences to visitedPlaces array using $addToSet
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/deleteUsers/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await UserModel .findByIdAndDelete(userId);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.post("/createUser", async (req, res) => {
    try {
        // Validate input using Joi
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newUser = await UserModel .create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Define routes for AsapModal
app.use("/main", routes);

// Default 404 route
app.use((req, res) => res.status(404).send('Not found'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});