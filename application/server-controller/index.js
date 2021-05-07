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

var totalID; // total Amount of UniqueID's in the database

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

// This is to get the total amount of Unique ID's given to the user
collaborativeDB.findOne("IDSettings" , { } , function(results){
  totalID = results.max_id;
});



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
  let username = req.body.username.toLowerCase();

  collaborativeDB.findOne("users", { username: username }, function (results) {
    results ? res.sendStatus(409) : res.sendStatus(200);
  });
});

app.post("/api/checkEmailAvailability", (req, res) => {
  let userEmail = req.body.email.toLowerCase();

  collaborativeDB.findOne("users", { email: userEmail }, function (results) {
    results ? res.sendStatus(409) : res.sendStatus(200);
  });
});

app.get("/api/tasks", authenticateToken, (req, res) => {
  collaborativeDB.findOne(
    "users",
    { username: req.user.sub },
    function ({ uniqueID }) {
      collaborativeDB.findMany(
        "tasks",
        {
          uniqueID,
        },
        function (results) {
          res.json(results);
        }
      );
    }
  );
});

//  TODO Check if there is still need to find the User, it could be shortened through uniqueID in JWT
//  TODO sendStatus(401) when error
app.post("/api/tasks/create", authenticateToken, (req, res) => {
  const {
    uniqueID,
    taskName,
    taskDescription,
    taskPriority,
    kanbanID,
  } = req.body;

  collaborativeDB.findOne(
    "users",
    { username: req.user.sub },
    function ({ uniqueID }) {
      collaborativeDB.insertOne("tasks", {
        uniqueID,
        taskName,
        taskDescription,
        taskPriority,
        kanbanID,
      });

      res.sendStatus(200);
    }
  );
});

app.post("/debug/tasks/create", (req, res) => {
  const {
    uniqueID,
    taskName,
    taskDescription,
    taskPriority,
    kanbanID,
  } = req.body;

  collaborativeDB.insertOne("tasks", {
    uniqueID,
    taskName,
    taskDescription,
    taskPriority,
    kanbanID,
  });
  res.sendStatus(200);
});

app.get("/api/projects", authenticateToken, (req, res) => {
  collaborativeDB.findOne(
    "users",
    { username: req.user.sub },
    function ({ uniqueID }) {
      collaborativeDB.findMany(
        "projects",
        {
          uniqueID,
        },
        function (results) {
          res.json(results);
        }
      );
    }
  );
});

app.post("/debug/projects/create", (req, res) => {
  const {
    uniqueID,
    favoured,
    members,
    projectName,
    backgroundID,
    description,
    kanbanID,
  } = req.body;

  collaborativeDB.insertOne("projects", {
    uniqueID,
    favoured,
    members,
    projectName,
    backgroundID,
    description,
    kanbanID,
  });
  res.sendStatus(200);
});

app.post("/api/registerUser", (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.log(error);
    }

    let user = {
      uniqueID: totalID,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    collaborativeDB.insertOne("users", user);
    collaborativeDB.updateOne("IDSettings" , { max_id : totalID } , {
      $set : {
        max_id : totalID + 1,
      }
        
    });

    totalID += 1;
  });

  //  TODO Check if it is possible that there is an error
  res.sendStatus(200);
});

app.post("/debug/registerUser", (req, res) => {
  const { uniqueID, username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.log(error);
    }

    let user = {
      uniqueID,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    collaborativeDB.insertOne("users", user);
  });

  //  TODO Check if it is possible that there is an error
  res.sendStatus(200);
});

app.post("/api/loginUser", (req, res) => {
  const { email, password } = req.body;

  collaborativeDB.findOne(
    "users",
    { email: email.toLowerCase() },
    function (results) {
      if (results) {
        bcrypt.compare(
          password,
          results.password,
          (error, authenticationResult) => {
            if (authenticationResult) {
              const accessToken = jwt.sign(
                { sub: results.username },
                process.env.ACCESS_TOKEN_SECRET
              );

              res.json({ accessToken });
            } else {
              res.sendStatus(401);
            }
          }
        );
      } else {
        res.sendStatus(401);
      }
    }
  );
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
