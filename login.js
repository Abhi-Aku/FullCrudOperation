const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Databash')
  .then(() => {
    console.log('Connection successful');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });

// Define Schema and Model
const DataSchema = new mongoose.Schema({
  name: String,
  email: String
});

const DataBashData = mongoose.model('DataBashData', DataSchema);
// POST route to add student data
app.post('/DataPost', async (req, res) => {
  const { name, email } = req.body;
  try {
    // Assuming DataBashData is a Mongoose model or similar
    const data = new DataBashData({ name, email });
    await data.save();
    res.status(201).send({ message: "Student Data Added Successfully"});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "An error occurred while saving data"});
  }
});
// GET endpoint to retrieve data
app.get('/DataGet', async (req, res) => {
  try {
    const FindData = await DataBashData.find();
    if (!FindData || FindData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json({ message: 'Data found', user: FindData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: 'Error finding data', error: error.message });
  }
});

// Update user data

app.put('/DataPut/:id', async (req, res) => {
  const { id } = req.params;
  const { name,email} = req.body;
  try {
      const updatedData = await DataBashData.findByIdAndUpdate(
          id,
          { name,email },
          { new: true, runValidators: true } // Options to return the updated document and run schema validation
      );
      if (!updatedData) {
          return res.status(404).json({ message: "No data found with this ID" });
      }
      res.status(200).json({ message: 'User updated successfully', updatedData });
  } catch (error) {
      console.error(error);
      // Check for unique email constraint error
      if (error.code === 11000) {
          return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Delet Data.......
app.delete('/DataDelete/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const deletedData = await DataBashData.findByIdAndDelete(id);
      if (!deletedData) {
          return res.status(404).json({ message: "No data found with this ID" });
      }
      res.status(200).json({ message: 'Data deleted successfully', deletedData });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
