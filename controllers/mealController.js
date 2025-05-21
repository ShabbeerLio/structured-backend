// controllers/mealController.js
const Meal = require("../models/Meal");

function getReminderTime(time) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m - 10);
  return date.toTimeString().slice(0, 5);
}

exports.getAllMeals = async (req, res) => {
  const meals = await Meal.find();
  res.json(meals);
};

exports.addMeal = async (req, res) => {
  const { day, meals } = req.body;

  // Add reminderTime to each meal
  const updatedMeals = meals.map((meal) => ({
    ...meal,
    reminderTime: getReminderTime(meal.time),
  }));

  const mealDoc = new Meal({ day, meals: updatedMeals });

  await mealDoc.save();
  res.status(201).json(mealDoc);
};
