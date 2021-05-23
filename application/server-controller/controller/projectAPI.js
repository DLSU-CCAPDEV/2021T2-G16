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
          function (myProjects) {
            collaborativeDB.findMany(
              "projects",
              { members: { $in: [{ username: req.user.sub }] } },
              function (othersProjects) {
                myProjects.push(...othersProjects);

                res.json(myProjects);
              }
            );
          }
        );
      }
    );
  },
  createProject: (req, res) => {
    collaborativeDB.findOne(
      "users",
      { username: req.user.sub },
      function ({ uniqueID }) {
        const { projectName, projectBackgroundImage, projectDescription } =
          req.body;

        collaborativeDB.insertOne("projects", {
          uniqueID,
          favoured: false,
          members: [],
          projectName,
          backgroundID: projectBackgroundImage,
          description: projectDescription,
          kanbanData: { lanes: [] },
        });
        res.sendStatus(200);
      }
    );
  },
  updateProject: (req, res) => {
    collaborativeDB.findOne(
      "users",
      { username: req.user.sub },
      function ({ uniqueID }) {
        const { projectName, backgroundID, description } =
          req.body.newProjectData;

        collaborativeDB.updateOne(
          "projects",
          { uniqueID, projectName: req.body.oldProjectName },
          {
            $set: {
              projectName: projectName,
              backgroundID: backgroundID,
              description: description,
            },
          }
        );

        res.sendStatus(200);
      }
    );
  },
  deleteProject: (req, res) => {
    const { uniqueID, projectName } = req.body;

    collaborativeDB.deleteOne("projects", {
      uniqueID,
      projectName,
    });

    res.sendStatus(200);
  },
  debug__createProject: (req, res) => {
    const {
      uniqueID,
      favoured,
      members,
      projectName,
      backgroundID,
      description,
      kanbanData,
    } = req.body;

    collaborativeDB.insertOne("projects", {
      uniqueID,
      favoured,
      members,
      projectName,
      backgroundID,
      description,
      kanbanData,
    });
    res.sendStatus(200);
  },
};

module.exports = projectAPI;
