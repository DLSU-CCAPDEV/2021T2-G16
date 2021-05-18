const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const collaborativeDB = require("../../database-model/db");

const saltRounds = 10;

var totalID; // total Amount of UniqueID's in the database

// This is to get the total amount of Unique ID's given to the user
collaborativeDB.findOne("IDSettings", {}, function (results) {
  totalID = results.max_id;
});

const userAPI = {
  registerUser: (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error) {
        console.log(error);
      }

      let user = {
        uniqueID: totalID,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      };

      collaborativeDB.insertOne("users", user);
      collaborativeDB.updateOne(
        "IDSettings",
        { max_id: totalID },
        {
          $set: {
            max_id: totalID + 1,
          },
        }
      );

      totalID += 1;
    });

    //  TODO Check if it is possible that there is an error
    res.sendStatus(200);
  },
  loginUser: (req, res) => {
    const { email, password } = req.body;

    collaborativeDB.findOne(
      "users",
      { email: email.toLowerCase() },
      function (results) {
        if (results) {
          bcrypt.compare(
            password,
            results.password,
            (error, authenticationResult) => {
              if (authenticationResult) {
                const accessToken = jwt.sign(
                  { sub: results.username },
                  process.env.ACCESS_TOKEN_SECRET
                );

                res.json({ accessToken });
              } else {
                res.sendStatus(401);
              }
            }
          );
        } else {
          res.sendStatus(401);
        }
      }
    );
  },
  checkUsernameAvailablity: (req, res) => {
    const username = req.body.username.toLowerCase();

    collaborativeDB.findOne(
      "users",
      { username: username },
      function (results) {
        results ? res.sendStatus(409) : res.sendStatus(200);
      }
    );
  },
  checkEmailAvailability: (req, res) => {
    const userEmail = req.body.email.toLowerCase();

    collaborativeDB.findOne("users", { email: userEmail }, function (results) {
      results ? res.sendStatus(409) : res.sendStatus(200);
    });
  },
  debug__registerUser: (req, res) => {
    const { uniqueID, username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error) {
        console.log(error);
      }

      let user = {
        uniqueID,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      };

      collaborativeDB.insertOne("users", user);
    });

    //  TODO Check if it is possible that there is an error
    res.sendStatus(200);
  },
};

module.exports = userAPI;
