const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mealRoutes = require("./routes/meals");
const { router: pushRoutes } = require("./routes/push");
const scheduler = require("./corn/scheduler");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/meals", mealRoutes);
app.use("/api/push", pushRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(8000, () => console.log("Server started on port 8000"));
});

