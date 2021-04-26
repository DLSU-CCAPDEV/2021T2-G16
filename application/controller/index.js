const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");
const db = require("./models/db.js");

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT;
hostname = process.env.HOSTNAME;

// Bounding Server (Essentially checking if the server is listening (working))
app.listen(port, hostname, function () {
  console.log("Server Running at:");
  console.log("http://" + hostname + ":" + port);
});
