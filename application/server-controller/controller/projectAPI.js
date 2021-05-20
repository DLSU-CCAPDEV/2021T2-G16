const collaborativeDB = require("../../database-model/db");

var ID; 

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
            ID = results.uniqueID;
          }
        );
      }
    );
  },

  createProject: (req, res) => {

    var members = [ID]; // Temp

    var project = 
    {
      uniqueID : ID,
      favoured : false, // Can be changed later just a temp value
      members : members, // can be changed later just a temp value
      projectName : req.body.projectName,
      backgroundID : req.body.projectBackgroundImage,
      description : req.body.projectDescription,
      kanbanID : "",
    };

    collaborativeDB.insertOne("projects" , project);
    res.sendStatus(200);
  },
  
  updateProject: (req, res) => {
    
    var members = [ID]; // Temp

    collaborativeDB.updateOne(
              "projects",
              { ID, projectName: oldProjectName },
              {
                $set: { projectName : req.body.projectName,
                        backgroundID : req.body.projectBackgroundImage,
                        description : req.body.projectDescription,
                        members : members
                      },
              }
            );
  },


  deleteProject: (req , res) => {

    collaborativeDB.deleteOne("projects" , {uniqueID : ID , projectName : req.body.projectName});
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
