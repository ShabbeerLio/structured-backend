const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");

// GET /api/meals/:day
router.get("/:day", async (req, res) => {
  try {
    const day = req.params.day;
    const meals = await Meal.find({ day });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;