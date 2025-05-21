const mongoose = require("mongoose");
const Meal = require("../models/Meal");
const mealData = require("../data/weekly_meal_plan.json");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Meal.deleteMany({});
    const meals = [];

    for (const [day, items] of Object.entries(mealData)) {
      items.forEach((meal) => {
        meals.push({ day, ...meal });
      });
    }

    await Meal.insertMany(meals);
    console.log("Meal data seeded.");
    process.exit();
  })
  .catch((err) => console.error(err));