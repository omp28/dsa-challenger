require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const registerRoute = require("./auth/register");
const loginRoute = require("./auth/login");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("request received");
});

app.post("/test", (req, res) => {
  console.log("request received");
  res.send("test");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

module.exports = app;
