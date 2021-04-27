const db = require("./models/db.js");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.post("/api/registerUser", (req, res) => {
  console.table(req.query);
});

// Bounding Server (Essentially checking if the server is listening (working))
app.listen(port, hostname, function () {
  console.log("Server Running at:");
  console.log("http://" + hostname + ":" + port);
});
