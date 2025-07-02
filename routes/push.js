
const express = require("express");
const webpush = require("web-push");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

let subscriptions = [];

webpush.setVapidDetails(
  "mailto:mdshabbeer707@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

router.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

const sendMealNotification = (title, body) => {
  const payload = JSON.stringify({ title, body });
  subscriptions.forEach((sub) => {
    webpush.sendNotification(sub, payload).catch((err) => console.error("Push error:", err));
  });
};

module.exports = { router, sendMealNotification };