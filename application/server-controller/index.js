const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const collaborativeDB = require("../database-model/db");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");

const saltRounds = 10;

const app = express(); // Initialize Express Server

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

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

//  TODO add cors() for extra security
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/api/checkUsernameAvailability", (req, res) => {
  collaborativeDB.findOne(
    "users",
    { username: req.body.username },
    function (results) {
      results ? res.sendStatus(409) : res.sendStatus(200);
    }
  );
});

app.post("/api/checkEmailAvailability", (req, res) => {
  collaborativeDB.findOne(
    "users",
    { email: req.body.email },
    function (results) {
      results ? res.sendStatus(409) : res.sendStatus(200);
    }
  );
});

//  TODO db
app.get("/api/tasks", authenticateToken, (req, res) => {
  //  TODO temporary expression, just to match-up username to uniqueID
  const user = users.find((user) => user.username === req.user.sub);
  //

  user
    ? res.json(
        taskDatabseInject.filter((task) => task.uniqueID === user.uniqueID)
      )
    : res.sendStatus(401);
});

//  TODO db
app.post("/api/tasks/create", authenticateToken, (req, res) => {
  //  TODO temporary expression, just to match-up username to uniqueID
  const user = users.find((user) => user.username === req.user.sub);
  const { taskName, taskDescription, taskPriority } = req.body;
  //

  if (user) {
    taskDatabseInject.push({
      uniqueID: user.uniqueID,
      taskName,
      taskDescription,
      taskPriority,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

//  TODO db
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
  const { uniqueID, username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.log(error);
    }

    let user = {
      uniqueID,
      username,
      email,
      password: hashedPassword,
    };

    collaborativeDB.insertOne("users", user);
  });

  //  TODO Check if it is possible that there is an error
  res.sendStatus(200);
});

app.post("/api/loginUser", (req, res) => {
  const { email, password } = req.body;

  collaborativeDB.findOne("users", { email }, function (results) {
    if (!results) {
      bcrypt.compare(password, results.password, (error, result) => {
        if (result) {
          const accessToken = jwt.sign(
            { sub: results.username },
            process.env.ACCESS_TOKEN_SECRET
          );

          res.json({ accessToken });
        } else {
          console.log(error);
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  });
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

app.listen(port, hostname, function () {
  console.log("Server Running at:");
  console.log("http://" + hostname + ":" + port);
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
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "1",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "1",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    taskPriority: "low",
  },
  {
    uniqueID: "1",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    taskPriority: "medium",
  },
  {
    uniqueID: "1",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "2",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "2",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "2",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    taskPriority: "low",
  },
  {
    uniqueID: "2",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    taskPriority: "medium",
  },
  {
    uniqueID: "2",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "3",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "3",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "3",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    taskPriority: "low",
  },
  {
    uniqueID: "3",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    taskPriority: "medium",
  },
  {
    uniqueID: "3",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "4",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "4",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "4",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    taskPriority: "low",
  },
  {
    uniqueID: "4",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    taskPriority: "medium",
  },
  {
    uniqueID: "4",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "5",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "5",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "5",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    taskPriority: "low",
  },
  {
    uniqueID: "5",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    taskPriority: "medium",
  },
  {
    uniqueID: "5",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "6",
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "6",
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanID: "",
    taskPriority: "high",
  },
  {
    uniqueID: "6",
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanID: "",
    taskPriority: "low",
  },
  {
    uniqueID: "6",
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanID: "",
    taskPriority: "medium",
  },
  {
    uniqueID: "6",
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanID: "",
    taskPriority: "high",
  },
];
