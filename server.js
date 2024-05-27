const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const cors = require('cors');
const GodsModal = require('./Backend/Model/temple.js');
const routes = require('./routes.js')


// define the ping route with the response in JSON
app.get('/ping', (req, res) => {
  res.json({ messege: 'pong' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
