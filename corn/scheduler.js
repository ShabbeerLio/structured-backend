// cron/scheduler.js
const cron = require("node-cron");
const Meal = require("../models/Meal");
const { sendMealNotification } = require("../routes/push");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = now.toTimeString().slice(0, 5);

  const mealsToday = await Meal.find({ day: dayName });
  mealsToday.forEach((meal) => {
    const [h, m] = meal.time.split(":").map(Number);
    const notifyTime = new Date();
    notifyTime.setHours(h, m - 10, 0);
    const checkTime = notifyTime.toTimeString().slice(0, 5);

    if (checkTime === currentTime) {
      sendMealNotification(`Upcoming Meal: ${meal.name}`, meal.instructions);
    }
  });
});
