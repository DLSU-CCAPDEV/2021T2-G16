const collaborativeDB = require("../../database-model/db");

const taskAPI = {
  getTasks: (req, res) => {
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
  },
  createTask: (req, res) => {
    //  TODO Check if there is still need to find the User, it could be shortened through uniqueID in JWT
    //  TODO sendStatus(401) when error
    const { taskName, taskDescription, taskPriority, kanbanID } = req.body;

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
  },
  updateTask: (req, res) => {
    const { taskName, taskDescription, taskPriority, oldTaskName } = req.body;

    collaborativeDB.findOne(
      "users",
      { username: req.user.sub },
      function ({ uniqueID }) {
        collaborativeDB.findOne(
          "tasks",
          {
            uniqueID,
          },
          function (results) {
            collaborativeDB.updateOne(
              "tasks",
              { uniqueID, taskName: oldTaskName },
              {
                $set: { taskName: taskName, taskDescription, taskPriority },
              }
            );
          }
        );

        res.sendStatus(200);
      }
    );
  },
  deleteTask: (req, res) => {
    const { uniqueID, taskName, taskDescription, taskPriority } = req.body;

    collaborativeDB.deleteOne("tasks", {
      uniqueID: Number.parseInt(uniqueID),
      taskName,
      taskDescription,
      taskPriority,
    });

    res.sendStatus(200);
  },
  debug__createTask: (req, res) => {
    const { uniqueID, taskName, taskDescription, taskPriority, kanbanID } =
      req.body;

    collaborativeDB.insertOne("tasks", {
      uniqueID,
      taskName,
      taskDescription,
      taskPriority,
      kanbanID,
    });
    res.sendStatus(200);
  },
};

module.exports = taskAPI;
