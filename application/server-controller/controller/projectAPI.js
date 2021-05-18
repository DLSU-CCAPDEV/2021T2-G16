const collaborativeDB = require("../../database-model/db");

const projectAPI = {
  getProjects: (req, res) => {
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
  },
};


// app.post("/debug/projects/create", (req, res) => {
//   const {
//     uniqueID,
//     favoured,
//     members,
//     projectName,
//     backgroundID,
//     description,
//     kanbanID,
//   } = req.body;

//   collaborativeDB.insertOne("projects", {
//     uniqueID,
//     favoured,
//     members,
//     projectName,
//     backgroundID,
//     description,
//     kanbanID,
//   });
//   res.sendStatus(200);
// });


module.exports = projectAPI;
