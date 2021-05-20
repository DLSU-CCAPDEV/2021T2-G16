const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const projectAPI = require("../controller/projectAPI");
const taskAPI = require("../controller/taskAPI");
const userAPI = require("../controller/userAPI");

const app = express();

dotenv.config({ path: "../" });

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

//  Task API
app.get("/api/tasks/get", authenticateToken, taskAPI.getTasks);
app.post("/api/tasks/create", authenticateToken, taskAPI.createTask);
app.post("/api/tasks/update", authenticateToken, taskAPI.updateTask);
app.post("/api/tasks/delete", authenticateToken, taskAPI.deleteTask);
app.post("/debug/tasks/create", taskAPI.debug__createTask);

//  Project API
app.get("/api/projects/get", authenticateToken, projectAPI.getProjects);

//  User API
app.post("/api/registerUser", userAPI.registerUser);
app.post("/api/loginUser", userAPI.loginUser);
app.post("/api/checkUsernameAvailability", userAPI.checkUsernameAvailablity);
app.post("/api/checkEmailAvailability", userAPI.checkEmailAvailability);
app.post("/debug/registerUser", userAPI.debug__registerUser);

module.exports = app;
