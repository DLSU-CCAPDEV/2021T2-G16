const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../database-model/db");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

const saltRounds = 10;

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

//  TODO inject into mongoDB in this statement
const addToUserDatabase = ({ username, email, password }) => {
  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.log(error);
    }

    users.push({ username, email, password: hashedPassword });
  });
};

//  TODO: Delete this temp injection
const users = [];

addToUserDatabase({
  username: "TestUser",
  email: "a@gmail.com",
  password: "a",
});
addToUserDatabase({
  username: "AlyssaMerkadio",
  email: "Alyssa21@gmail.com",
  password: "WhitePeopleHappy",
});
addToUserDatabase({
  username: "JenkinsMarcolo",
  email: "JMLeniel@dlsu.dasma.com.ph",
  password: "Jokrill",
});
addToUserDatabase({
  username: "MalakaiMerquin",
  email: "Malakai@yahoo.com",
  password: "boyoingOW",
});
addToUserDatabase({
  username: "PanteneDenise",
  email: "OPFracture@yahoo.com",
  password: "SolarMower",
});
addToUserDatabase({
  username: "Quene Victoria",
  email: "Qazujm@daporta.com.eu",
  password:
    "KP0c@vGu7ysp4EgoFHOUdqv*Tb#m2^K8NW^T!cc8KO!XSOn&K#yUz25DJmYzFTGCq9lrTjy#",
});
//

//  TODO add cors() for extra security
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/checkUsernameAvailability", (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  user ? res.sendStatus(409) : res.sendStatus(200);
});

app.post("/api/checkEmailAvailability", (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  user ? res.sendStatus(409) : res.sendStatus(200);
});

app.post("/api/registerUser", (req, res) => {
  addToUserDatabase(req.body);

  //  TODO Check if it is possible that there is an error
  res.send("User Registered");
});

app.post("/api/loginUser", (req, res) => {
  const { email, password } = req.body;

  //  TODO request from mongoDB in this statement
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  user
    ? bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.sendStatus(401);
        }
      })
    : res.sendStatus(401);
});

//  TODO Debug tool, Remove when deployed
app.get("/debug/userProfiles", (req, res) => {
  res.send(users);
});

app.use(
  "/static",
  express.static(path.join(__dirname, "../client-view/build//static"))
);

app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client-view/build/"),
  });
});

// Bounding Server (Essentially checking if the server is listening (working))
app.listen(port, hostname, function () {
  console.log("Server Running at:");
  console.log("http://" + hostname + ":" + port);
});
