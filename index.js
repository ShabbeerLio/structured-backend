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

let clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);

  ws.on("message", (data) => {
    // Broadcast audio to others
    for (let client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  server.listen(8000, () =>
    console.log("Server + WebSocket running on port 8000")
  );
});
