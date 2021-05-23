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
          function (myResults) {
            if (myResults) {
              res.json(myResults);
            } else {
              collaborativeDB.findOne(
                "projects",
                {
                  projectName: req.body.projectName,
                  members: { $in: [{ username: req.user.sub }] },
                },
                function (othersResults) {
                  res.json(othersResults);
                }
              );
            }
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
            $or: [
              { members: { $in: [{ username: req.user.sub }] } },
              { uniqueID },
            ],
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
  editMemberList: (req, res) => {
    const { newData } = req.body;

    collaborativeDB.findOne(
      "users",
      { username: req.user.sub },
      function ({ uniqueID }) {
        collaborativeDB.updateOne(
          "projects",
          {
            uniqueID,
            projectName: newData.projectName,
          },
          {
            $set: {
              members: newData.members,
            },
          }
        );

        res.sendStatus(200);
      }
    );
  },
};

module.exports = kanbanAPI;
