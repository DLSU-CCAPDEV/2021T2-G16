const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../model/db");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

app.use(bodyParser.urlencoded({ extended: false }));

//  TODO: Delete this temp injection
const users = [
  {
    uniqueID: "1",
    username: "Test User",
    email: "a@gmail.com",
    password: "a",
  },
  {
    uniqueID: "2",
    username: "Alyssa Merkadio",
    email: "Alyssa21@gmail.com",
    password: "WhitePeopleHappy",
  },
  {
    uniqueID: "3",
    username: "Jenkins Marcolo",
    email: "JMLeniel@dlsu.dasma.com.ph",
    password: "Jokrill",
  },
  {
    uniqueID: "4",
    username: "Malakai Merquin",
    email: "Malakai@yahoo.com",
    password: "boyoingOW",
  },
  {
    uniqueID: "5",
    username: "Pantene Denise",
    email: "OPFracture@yahoo.com",
    password: "SolarMower",
  },
  {
    uniqueID: "6",
    username: "Quene Victoria",
    email: "Qazujm@daporta.com.eu",
    password:
      "KP0c@vGu7ysp4EgoFHOUdqv*Tb#m2^K8NW^T!cc8KO!XSOn&K#yUz25DJmYzFTGCq9lrTjy#",
  },
];

app.get("/api/checkUsernameAvailability", (req, res) => {
  const user = users.find((user) => user.username === req.query.username);

  if (!user) {
    res.status(401);
  }

  res.send("");
});

app.post("/api/registerUser", (req, res) => {
  const { username, email, password } = req.body;

  users.push({ username, email, password });

  res.send("Received");
});

app.post("/api/loginUser", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    res.status(401).send("Mismatching Credentials");
  } else {
    res.send({ token: "test123" });
  }
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
