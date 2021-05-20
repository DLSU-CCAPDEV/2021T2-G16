const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/routes.js");
const path = require("path");

const app = express();

dotenv.config();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

//  TODO add cors() for extra security
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", routes);

app.use(
  "/static",
  express.static(path.join(__dirname, "../client-view/build//static"))
);

app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client-view/build/"),
  });
});

app.listen(port, hostname, function () {
  console.log("Server Running at:");
  console.log("http://" + hostname + ":" + port);
});
