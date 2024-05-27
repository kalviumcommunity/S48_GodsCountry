const express = require('express');
const router = express.Router();


// Create
router.post('/create', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Data created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create data' });
  } finally {
    await client.close();
  }
});


// Read
router.get('/read', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Data read successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to read data' });
  } finally {
    await client.close();
  }
});

// Update
router.put('/update', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to update data' });
  } finally {
    await client.close();
  }
});

// Delete
router.delete('/delete', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete data' });
  } finally {
    await client.close();
  }
});

module.exports = router;