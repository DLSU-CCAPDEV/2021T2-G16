const collaborativeDB = require("../../database-model/db");

const kanbanAPI = {
  getProject: (req, res) => {
    collaborativeDB.findOne(
      "users",
      { username: req.user.sub },
      function ({ uniqueID }) {
        collaborativeDB.findOne(
          "projects",
          {
            uniqueID,
            projectName: req.body.projectName,
          },
          function (results) {
            res.json(results);
          }
        );
      }
    );
  },
};

module.exports = kanbanAPI;
