const collaborativeDB = require("../../database-model/db");

const kanbanAPI = {
  getKanban: (req, res) => {
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
  updateKanban: (req, res) => {
    const { projectName, newData } = req.body;

    collaborativeDB.findOne(
      "users",
      { username: req.user.sub },
      function ({ uniqueID }) {
        collaborativeDB.updateOne(
          "projects",
          {
            uniqueID,
            projectName,
          },
          {
            $set: {
              kanbanData: newData,
            },
          }
        );

        res.sendStatus(200);
      }
    );
  },
};

module.exports = kanbanAPI;
