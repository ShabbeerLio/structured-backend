const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  day: String,
  name: String,
  time: String,
  instructions: String,
});

module.exports = mongoose.model("Meal", mealSchema);