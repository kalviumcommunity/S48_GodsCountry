const express = require('express');
const router = express.Router();
const { UserModal, userValidationSchema } = require('./Model/user.js');
const { TempleModal, validateGodsSchema } = require('./Model/temple.js');
const jwt = require('jsonwebtoken');

// Routes for UserModal
router.get('/getusers', async (req, res) => {
    try {
        const users = await UserModal.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getusers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModal.findById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create user route
router.post("/createUser", async (req, res) => {
  try {
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

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModal.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login successful', user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Routes for TempleModal
router.get("/temples", async (req, res) => {
    try {
        const templeModels = await TempleModal.find();
        res.json(templeModels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/temples', async (req, res) => {
    try {
        const newTempleData = req.body;
        const { error } = validateGodsSchema(newTempleData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const newTemple = new TempleModal(newTempleData);
        await newTemple.save();
        res.status(201).json({ message: 'Temple added successfully', temple: newTemple });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.put('/temples/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const updateData = req.body;
      const { error } = validateGodsSchema(updateData);
      if (error) {
          return res.status(400).json({ message: error.details[0].message });
      }
      const updatedTemple = await TempleModal.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedTemple) {
          return res.status(404).json({ message: 'Temple not found' });
      }
      res.json({ message: 'Temple updated successfully', temple: updatedTemple });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete a temple
router.delete('/temples/:id', async (req, res) => {
  const templeId = req.params.id;
  try {
      const deletedTemple = await TempleModal.findByIdAndDelete(templeId);
      if (!deletedTemple) {
          return res.status(404).json({ message: 'Temple not found' });
      }
      res.json({ message: 'Temple deleted successfully', temple: deletedTemple });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;
