const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes.js');
const port = 3001;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const mongodb_uri = process.env.MONGODB_URI;

mongoose.connect(mongodb_uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use("/", routes);

app.get('/mongoConnection', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            res.json("Connected to database");
        }
    } catch (err) {
        res.json("Unable to connect to the database");
        console.error({ message: "Error connecting to the database" }, err);
    }
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 Server running on PORT: ${port}`);
    });
}

module.exports = app;
