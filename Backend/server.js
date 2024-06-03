const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TempleModel = require('./Model/temple');
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
app.get('/temples', (req, res) => {
    TempleModel.find()
    .then(temples => res.json(temples))
    .catch(err => console.log(err));
});

// Default 404 route
// app.use((req, res) => res.status(404).send('Not found'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});