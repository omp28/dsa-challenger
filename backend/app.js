const express = require("express");
const mongoose = require("mongoose");
PORT = 3000
const app = express();
const dotenv = require('dotenv');
const uploadQuestions = require('./services/problem');
dotenv.config();
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
  console.log("reques received");
});
