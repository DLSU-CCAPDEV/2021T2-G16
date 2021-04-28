const db = require("../model/db");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

const users = [];

const printUsers = () => {
  console.log("Here:");
  console.table(users);
};

app.get("/api/getUsers", (req, res) => {
  res.send(JSON.stringify(users));
});

app.post("/api/registerUser", (req, res) => {
  users.push(req.query);
  printUsers();
  res.send("Received");
});

app.post("/api/loginUser", (req, res) => {
  users.push(req.query);
  printUsers();
  res.send("Received");
});

app.use(
  "/static",
  express.static(path.join(__dirname, "../view/build//static"))
);

app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../view/build/"),
  });
});

// Bounding Server (Essentially checking if the server is listening (working))
app.listen(port, hostname, function () {
  console.log("Server Running at:");
  console.log("http://" + hostname + ":" + port);
});
