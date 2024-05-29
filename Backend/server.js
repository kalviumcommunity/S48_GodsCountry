const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { UserModal, userValidationSchema } = require('./Model/user.js');
const { TempleModal, validateGodsSchema } = require('./Model/temple.js');
const routes = require('./routes.js');
const port = 3001;
const Joi = require("joi");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const mongodb_uri = process.env.MONGODB_URI
app.use("/", routes);

mongoose.connect(mongodb_uri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Connect to MongoDB 
app.get('/mongoConnection', async (req, res)=>{
    try {if(mongoose.connection.readyState === 1) {
        res.json("Connected to database")
    } }catch(err) {
        res.json("Unable to connect to the database")
        console.error({message : "Error connecting to the database"}, err);
    }
}) 

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
app.get("/temples", async (req, res) => {
    try {
        const templeModels = await TempleModal.find(); // Changed variable name
        res.json(templeModels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/temples', async (req, res) => {
    try {
      const newTempleData = req.body;
      
      // Validate the temple data against the schema
      const { error } = validateGodsSchema(newTempleData);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      
      // Create a new temple instance using TempleModal
      const newTemple = new TempleModal(newTempleData);
  
      // Save the new temple to the database
      await newTemple.save();
  
      // Respond with success message and the new temple data
      res.status(201).json({ message: 'Temple added successfully', temple: newTemple });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server running on PORT: ${port}`);
    });
}

module.exports = app;
