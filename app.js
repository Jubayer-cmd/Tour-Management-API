const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//routes
const TourRoute = require("./routes/tour.route");

app.get("/", (req, res) => {
  res.send("WOW! server is Running...");
});
app.use("/tours", TourRoute);
app.use("/tour", TourRoute);

module.exports = app;
