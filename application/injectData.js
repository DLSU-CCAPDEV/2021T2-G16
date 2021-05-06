const axios = require("axios");

const users = [
  {
    uniqueID: "1",
    username: "TestUser",
    email: "a@gmail.com",
    password: "a",
  },
  {
    uniqueID: "2",
    username: "AlyssaMerkadio",
    email: "Alyssa21@gmail.com",
    password: "WhitePeopleHappy",
  },
  {
    uniqueID: "3",
    username: "JenkinsMarcolo",
    email: "JMLeniel@dlsu.dasma.com.ph",
    password: "Jokrill",
  },
  {
    uniqueID: "4",
    username: "MalakaiMerquin",
    email: "Malakai@yahoo.com",
    password: "boyoingOW",
  },
  {
    uniqueID: "5",
    username: "PanteneDenise",
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

users.forEach(async (user) => {
  await axios.post("http://localhost:3000/api/registerUser", user);
});
