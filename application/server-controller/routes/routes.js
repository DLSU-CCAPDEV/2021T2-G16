const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");

const kanbanAPI = require("../controller/kanbanAPI");
const profileAPI = require("../controller/profileAPI");
const projectAPI = require("../controller/projectAPI");
const taskAPI = require("../controller/taskAPI");
const userAPI = require("../controller/userAPI");

const app = express();

dotenv.config({ path: "../" });

//  TODO Do a middleware that could inject the user's uniqueID
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

//  KANBAN API
app.post("/api/projects/kanban/get", authenticateToken, kanbanAPI.getKanban);
app.post(
  "/api/projects/kanban/update",
  authenticateToken,
  kanbanAPI.updateKanban
);

//  Task API
app.get("/api/tasks/get", authenticateToken, taskAPI.getTasks);
app.post("/api/tasks/create", authenticateToken, taskAPI.createTask);
app.post("/api/tasks/update", authenticateToken, taskAPI.updateTask);
app.post("/api/tasks/delete", authenticateToken, taskAPI.deleteTask);
app.post("/debug/tasks/create", taskAPI.debug__createTask);

//  Profile API
app.post("/api/userProfile/get", profileAPI.fetchUserProfilePage);

//  Project API
app.get("/api/projects/get", authenticateToken, projectAPI.getProjects);
app.post("/api/projects/create", authenticateToken, projectAPI.createProject);
app.post("/api/projects/update", authenticateToken, projectAPI.updateProject);
app.post("/api/projects/delete", authenticateToken, projectAPI.deleteProject);
app.post("/debug/projects/create", projectAPI.debug__createProject);

//  User API
app.get("/api/users/get", authenticateToken, userAPI.fetchUser);
app.post("/api/registerUser", userAPI.registerUser);
app.post("/api/loginUser", userAPI.loginUser);
app.post("/api/checkUsernameAvailability", userAPI.checkUsernameAvailablity);
app.post("/api/checkEmailAvailability", userAPI.checkEmailAvailability);
app.post("/debug/registerUser", userAPI.debug__registerUser);

module.exports = app;
