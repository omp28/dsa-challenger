const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    problem_id: { type: String, required: true, unique: true },
    platform: { type: String, required: true },
    problem_name: { type: String, required: true },
    problem_link: { type: String, required: true },
    difficulty: { type: String, required: true },
    tags: { type: Array, required: true },
  },
  { timeStamp: true }
);

mongoose.models = {};

module.exports = mongoose.model("Problem", ProblemSchema);
