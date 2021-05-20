const collaborativeDB = require("../../database-model/db");

const profileAPI = {
  fetchUserProfilePage: (req, res) => {
    collaborativeDB.findOne(
      "users",
      { username: req.body.username.toLowerCase() },
      function (results) {
        if (results) {
          const { uniqueID, username } = results;
          res.json({ uniqueID, username });
        } else {
          res.sendStatus(404);
        }
      }
    );
  },
};

module.exports = profileAPI;
