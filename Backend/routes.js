const express = require('express');
const router = express.Router();
const { UserModal, userValidationSchema } = require('./Model/user.js');
const { TempleModel, validateGodsSchema } = require('./Model/temple.js');
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
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedUser);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      res.json(deletedUser);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Fetch all temples
router.get('/temples', async (req, res) => {
  try {
      const temples = await TempleModel.find();
      res.json(temples);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
