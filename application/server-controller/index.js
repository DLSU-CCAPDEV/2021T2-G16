const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../database-model/db");
const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const saltRounds = 10;

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

//  TODO inject into mongoDB in this statement
const addToUserDatabase = ({ uniqueID, username, email, password }) => {
  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.log(error);
    }

    users.push({ uniqueID, username, email, password: hashedPassword });
  });
};

const authenticateToken = (req, res, next) => {
  const authenticationHeader = req.headers["authorization"];
  const token = authenticationHeader && authenticationHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

//  TODO: Delete this temp injection
const users = [];

addToUserDatabase({
  uniqueID: "1",
  username: "TestUser",
  email: "a@gmail.com",
  password: "a",
});
addToUserDatabase({
  uniqueID: "2",
  username: "AlyssaMerkadio",
  email: "Alyssa21@gmail.com",
  password: "WhitePeopleHappy",
});
addToUserDatabase({
  uniqueID: "3",
  username: "JenkinsMarcolo",
  email: "JMLeniel@dlsu.dasma.com.ph",
  password: "Jokrill",
});
addToUserDatabase({
  uniqueID: "4",
  username: "MalakaiMerquin",
  email: "Malakai@yahoo.com",
  password: "boyoingOW",
});
addToUserDatabase({
  uniqueID: "5",
  username: "PanteneDenise",
  email: "OPFracture@yahoo.com",
  password: "SolarMower",
});
addToUserDatabase({
  uniqueID: "6",
  username: "Quene Victoria",
  email: "Qazujm@daporta.com.eu",
  password:
    "KP0c@vGu7ysp4EgoFHOUdqv*Tb#m2^K8NW^T!cc8KO!XSOn&K#yUz25DJmYzFTGCq9lrTjy#",
});

projectDatabaseInject = [
  {
    uniqueID: "1",
    favoured: true,
    members: [{ uniqueID: "6" }],
    projectName: "Grocery Store - Application",
    backgroundID: "2",
    description: "Application for simulating grocery stores.",
    kanbanID: "",
  },
  {
    uniqueID: "1",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Redux Project",
    backgroundID: "3",
    description: "Project Stack of Redux",
    kanbanID: "",
  },
  {
    uniqueID: "1",
    favoured: true,
    members: [{ uniqueID: "6" }],
    projectName: "Hot tub Stream OTW",
    backgroundID: "1",
    description:
      "Get your friends in a all-in-one hang-out in a Hot tub party!",
    kanbanID: "",
  },
  {
    uniqueID: "1",
    favoured: false,
    members: [],
    projectName: "Memorial Queza",
    backgroundID: "2",
    description:
      "This is a test project purposely made for fake data injection.",
    kanbanID: "",
  },
  {
    uniqueID: "2",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Roblox Project",
    backgroundID: "2",
    description: "This project is for fun and to build a house in roblox",
    kanbanID: "",
  },
  {
    uniqueID: "2",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Minecraft Mansion",
    backgroundID: "3",
    description: "Build the Tower of your dreams in minecraft!",
    kanbanID: "",
  },
  {
    uniqueID: "2",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "New PC Building with 0 dollars",
    backgroundID: "1",
    description: "Help us build a PC using 0 Dollars",
    kanbanID: "",
  },
  {
    uniqueID: "2",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Web Application",
    backgroundID: "2",
    description: "Grocery Web Application",
    kanbanID: "",
  },
  {
    uniqueID: "3",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Web Application",
    backgroundID: "3",
    description: "New Forum Web Application!",
    kanbanID: "",
  },
  {
    uniqueID: "3",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "New Company Set",
    backgroundID: "1",
    description: "New Company Set for Recording ads!",
    kanbanID: "",
  },
  {
    uniqueID: "3",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Advertise",
    backgroundID: "3",
    description: "Advertisement for our company",
    kanbanID: "",
  },
  {
    uniqueID: "3",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Rearrangement of Equipments",
    backgroundID: "2",
    description: "Rearrangement or Fixing of Equipments",
    kanbanID: "",
  },

  {
    uniqueID: "4",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Poster for Church",
    backgroundID: "1",
    description: "Poster that needed to be submitted",
    kanbanID: "",
  },

  {
    uniqueID: "4",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Research Paper about Computer Vision",
    backgroundID: "2",
    description: "Making of Research Paper needed for submission",
    kanbanID: "",
  },

  {
    uniqueID: "4",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Fixing of Keyboard",
    backgroundID: "1",
    description: "Fix all Company Keyboards",
    kanbanID: "",
  },

  {
    uniqueID: "4",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Upgrade of PC's",
    backgroundID: "3",
    description: "Upgrading of all PC's in the company",
    kanbanID: "",
  },

  {
    uniqueID: "5",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Fixing of Roof",
    backgroundID: "2",
    description: "Fixing of Company Roof",
    kanbanID: "",
  },

  {
    uniqueID: "5",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Soccer Competition",
    backgroundID: "3",
    description: "Soccer Competition for Employees!",
    kanbanID: "",
  },

  {
    uniqueID: "5",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Bonus Payment",
    backgroundID: "2",
    description: "Calculation of All Bonus Payment for the Company",
    kanbanID: "",
  },

  {
    uniqueID: "5",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Renovation",
    backgroundID: "3",
    description: "All Required Renovation for the Company",
    kanbanID: "",
  },

  {
    uniqueID: "6",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Renovation of Kitchen",
    backgroundID: "2",
    description: "Renovation of Kitchen at home",
    kanbanID: "",
  },

  {
    uniqueID: "6",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Meeting with Investors",
    backgroundID: "1",
    description: "Preparation of the Meeting with Investors",
    kanbanID: "",
  },

  {
    uniqueID: "6",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Construction of New Building",
    backgroundID: "1",
    description: "Future Company Building Project",
    kanbanID: "",
  },

  {
    uniqueID: "6",
    favoured: false,
    members: [{ uniqueID: "6" }],
    projectName: "Weekly Revenue Meetings",
    backgroundID: "3",
    description: "Week 51 Revenue meeting for the company",
    kanbanID: "",
  },
];

const taskDatabseInject = [
  {
    uniqueID: "1",
    taskID: "1",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "1",
    taskID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "1",
    taskID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    priority: "low",
  },
  {
    uniqueID: "1",
    taskID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    priority: "medium",
  },
  {
    uniqueID: "1",
    taskID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "2",
    taskID: "1",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "2",
    taskID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "2",
    taskID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    priority: "low",
  },
  {
    uniqueID: "2",
    taskID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    priority: "medium",
  },
  {
    uniqueID: "2",
    taskID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "3",
    taskID: "1",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "3",
    taskID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "3",
    taskID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    priority: "low",
  },
  {
    uniqueID: "3",
    taskID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    priority: "medium",
  },
  {
    uniqueID: "3",
    taskID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "4",
    taskID: "1",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "4",
    taskID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "4",
    taskID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    priority: "low",
  },
  {
    uniqueID: "4",
    taskID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    priority: "medium",
  },
  {
    uniqueID: "4",
    taskID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "5",
    taskID: "1",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "5",
    taskID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "5",
    taskID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    priority: "low",
  },
  {
    uniqueID: "5",
    taskID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    priority: "medium",
  },
  {
    uniqueID: "5",
    taskID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "6",
    taskID: "1",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "6",
    taskID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    priority: "high",
  },
  {
    uniqueID: "6",
    taskID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    priority: "low",
  },
  {
    uniqueID: "6",
    taskID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    priority: "medium",
  },
  {
    uniqueID: "6",
    taskID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    priority: "high",
  },
];

//

//  TODO add cors() for extra security
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/api/checkUsernameAvailability", (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  user ? res.sendStatus(409) : res.sendStatus(200);
});

app.post("/api/checkEmailAvailability", (req, res) => {
  const user = users.find((user) => user.username === req.user.sub);

  user ? res.sendStatus(409) : res.sendStatus(200);
});

app.get("/api/tasks", authenticateToken, (req, res) => {
  //  TODO temporary expression, just to match-up username to uniqueID
  const user = users.find((user) => user.username === req.user.sub);
  console.table(user);
  //

  user
    ? res.json(
        taskDatabseInject.filter((task) => task.uniqueID === user.uniqueID)
      )
    : res.sendStatus(401);
});

app.get("/api/projects", authenticateToken, (req, res) => {
  //  TODO temporary expression, just to match-up username to uniqueID
  const user = users.find((user) => user.username === req.user.sub);
  //

  user
    ? res.json(
        projectDatabaseInject.filter(
          (projects) => projects.uniqueID === user.uniqueID
        )
      )
    : res.sendStatus(401);
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
          //  TODO replace property value w/ uniqueID
          const accessToken = jwt.sign(
            { sub: user.username },
            process.env.ACCESS_TOKEN_SECRET
          );

          res.json({ accessToken });
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
