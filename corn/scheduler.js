// cron/scheduler.js
const cron = require('node-cron');
const Meal = require('../models/Meal');
const notifier = require('node-notifier'); // You may replace this with web-push or email

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  const mealsToday = await Meal.find({ day: dayName });
  if (!mealsToday || mealsToday.length === 0) return;

  mealsToday.forEach(meal => {
    if (meal.time === currentTime) {
      notifier.notify({
        title: `${meal.name} Reminder`,
        message: `Time to prepare: ${meal.instructions}`,
        sound: true
      });
    }
  });
});