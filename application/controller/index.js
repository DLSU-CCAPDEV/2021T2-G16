import db from "../model/db";
import dotenv from "dotenv";
import express from "express";
import path from "path";

const app = express();
dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

//  TODO: Delete this temp injection
const users = [
  {
    uniqueID: "1",
    firstName: "Test User",
    lastName: "Industries",
    email: "a@gmail.com",
    password: "a",
  },
  {
    uniqueID: "2",
    firstName: "Alyssa Merkadio",
    lastName: "De Laysia",
    email: "Alyssa21@gmail.com",
    password: "WhitePeopleHappy",
  },
  {
    uniqueID: "3",
    firstName: "Jenkins Marcolo",
    lastName: "Lenielamo",
    email: "JMLeniel@dlsu.dasma.com.ph",
    password: "Jokrill",
  },
  {
    uniqueID: "4",
    firstName: "Malakai Merquin",
    lastName: "Bobbyacu",
    email: "Malakai@yahoo.com",
    password: "boyoingOW",
  },
  {
    uniqueID: "5",
    firstName: "Pantene Denise",
    lastName: "Danjikwa",
    email: "OPFracture@yahoo.com",
    password: "SolarMower",
  },
  {
    uniqueID: "6",
    firstName: "Quene Victoria",
    lastName: "Taenoda",
    email: "Qazujm@daporta.com.eu",
    password:
      "KP0c@vGu7ysp4EgoFHOUdqv*Tb#m2^K8NW^T!cc8KO!XSOn&K#yUz25DJmYzFTGCq9lrTjy#",
  },
];

//  Get specific User
//  TODO: Link to database
app.get("/api/getUser", (req, res) => {
  const user = users.find((user) => user.uniqueID == req.query.uniqueID);
  res.send(user);
});

app.post("/api/registerUser", (req, res) => {
  users.push(req.query);
  printUsers();
  res.send("Received");
});

app.post("/api/loginUser", (req, res) => {
  const user = users.find((user) => user.uniqueID == req.query.uniqueID);
  res.send(user);
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
