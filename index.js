const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mealRoutes = require("./routes/meals");
const { router: pushRoutes } = require("./routes/push");
const scheduler = require("./corn/scheduler");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/meals", mealRoutes);
app.use("/api/push", pushRoutes);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let broadcaster = null;
const listeners = new Set();

wss.on("connection", (ws) => {
  ws.on("message", (message, isBinary) => {
    if (!isBinary) {
      const data = JSON.parse(message);
      if (data.type === "broadcaster") {
        broadcaster = ws;
      } else if (data.type === "listener") {
        listeners.add(ws);
      }
      return;
    }

    // if binary data from broadcaster
    if (ws === broadcaster) {
      for (const listener of listeners) {
        if (listener.readyState === WebSocket.OPEN) {
          listener.send(message, { binary: true });
        }
      }
    }
  });

  ws.on("close", () => {
    if (ws === broadcaster) broadcaster = null;
    listeners.delete(ws);
  });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  server.listen(8000, () =>
    console.log("Server + WebSocket running on port 8000")
  );
});
