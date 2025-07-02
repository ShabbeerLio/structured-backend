
// routes/meals.js
const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");

router.get("/:day", async (req, res) => {
  try {
    const meals = await Meal.find({ day: req.params.day });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;