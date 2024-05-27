const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { UserModal, userValidationSchema } = require('./Model/user.js');
const { TempleModal, validateGodsSchema } = require('./Model/temple.js'); // Updated import
const routes = require('./routes.js');
const Joi = require("joi");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB URI for UserModal
const userModalURI = "mongodb+srv://Prashanth:Prash%402005@cluster0.o3hncd3.mongodb.net/GodsOwnCountry?retryWrites=true&w=majority&appName=Cluster0";
// MongoDB URI for TempleModal
const templeModalURI = "mongodb://localhost:27017/templemodal"; // Updated URI for TempleModal

// Connect to MongoDB for UserModal
async function connectToUserDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(userModalURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to UserModal DB at ${userModalURI}`);
    } else {
        console.log(`Already connected to UserModal DB at ${userModalURI}`);
    }
}

// Connect to MongoDB for TempleModal
async function connectToTempleDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(templeModalURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to TempleModal DB at ${templeModalURI}`);
    } else {
        console.log(`Already connected to TempleModal DB at ${templeModalURI}`);
    }
}

// Define routes for UserModal
app.get('/getusers', async (req, res) => {
    try {
        const users = await UserModal.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/getusers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModal.findById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/updateUsers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModal.findByIdAndUpdate(
            id,
            { name: req.body.name, email: req.body.email, age: req.body.age, password: req.body.password},
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
        const deletedUser = await UserModal.findByIdAndDelete(userId);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a cookie when a user logs in
app.post("/login", async (req, res) => {
    try {
        // Assuming your login logic involves checking credentials
        const { email, password } = req.body;
        
        // Find the user in the MongoDB database
        const user = await UserModal.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a token for the user
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        // Set a cookie with the token
        res.cookie('token', token, { httpOnly: true });

        res.json({ message: 'Login successful', user , token });
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

        const newUser = await UserModal.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Define routes for TempleModal
app.use("/main", routes);

app.get("/", async (req, res) => {
    try {
        const templeModels = await TempleModal.find(); // Changed variable name
        console.log(templeModels);
        res.json(templeModels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Connect to databases and start the servers
Promise.all([connectToUserDB(), connectToTempleDB()]).then(() => {
    const userModalServer = app.listen(3001, () => {
        console.log("Server is running on port 3001 for UserModal");
    });

    const templeModalServer = app.listen(3000, ()  => {
        console.log("Server is running on port 3000 for TempleModal"); // Updated log message
    });
});

module.exports = app;
