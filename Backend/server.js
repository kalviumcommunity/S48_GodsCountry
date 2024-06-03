const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel, userValidationSchema } = require('./Model/user'); // Correct import
const TempleModel = require('./Model/temple');
const routes = require('./routes');
require('dotenv').config();
const jwt = require('jsonwebtoken')

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/', routes);

// Additional route to get all users
app.get('/getusers', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get a user by ID
app.get('/getusers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a user by ID
app.delete('/deleteUsers/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            console.error(`User with ID ${userId} not found`);
            return res.status(404).json({ error: "User not found" });
        }
        res.json(deletedUser);
    } catch (err) {
        console.error(`Error deleting user with ID ${userId}:`, err);
        res.status(500).json({ error: err.message });
    }
});

// Route to update a user by ID
app.put('/updateUsers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
      // Validate request body using Joi
      const { error, value } = UserValidation.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      // Check if the user exists
      const { username , email, password } = value;
      const user = await UserModel.findOne({ username });
  
      const accessToken = jwt.sign({username},process.env.ACCESSTOKEN_SECRET)
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
  
      res.json({ success: true, message: "Login successful",accessToken:accessToken });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, message: "An error occurred during login" });
    }
  });

// Route to create a new user
app.post('/createUser', async (req, res) => {
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get all temples
app.get('/temples', (req, res) => {
    TempleModel.find()
        .then(temples => res.json(temples))
        .catch(err => console.error(err));
});

// Default 404 route
app.use((req, res) => res.status(404).send('Not found'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀Server is running on port ${PORT}`);
});
