const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  day: String,
  time: String,
  name: String,
  instructions: String,
});

module.exports = mongoose.model("Meal", MealSchema);