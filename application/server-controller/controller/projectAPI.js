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

  createProjects: (req, res) => {


    collaborativeDB.findOne("users" , 
    {username : req.user.sub} , function({uniqueID}){
      ID = uniqueID;
    });


    var members = [ID];

    var project = 
    {
      uniqueID : ID,
      favoured : false, // Can be changed later just a temp value
      members : members, // can be changed later just a temp value
      projectName : req.body.projectName,
      backgroundID : req.body.backgroundID,
      description : req.body.description,
      kanbanID : req.body.kanbanID,
    };
    
    console.log(project);
    collaborativeDB.insertOne("projects" , project);
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
