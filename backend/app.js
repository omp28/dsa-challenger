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

const uploadQuestions = require('./services/problem');
app.listen(PORT, (error) => {
  console.log(`Server is running on port ${PORT}`);
});

// require("./services/problem")(app);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to database");
}).catch((error) => { console.log("Error connecting to database", error) });

app.use('/uploadproblems',uploadQuestions)
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("request received");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

module.exports = app;
