// server.js
const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./routes/mealRoutes');
const scheduler = require('./corn/scheduler');
const cors = require("cors");

const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/meals', mealRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));