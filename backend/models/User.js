const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profiles: {
      leetcode_id: { type: String, required: false },
      codeforces_id: { type: String, required: false },
    },
    problems_solved: [
      {
        problem_id: { type: String, required: true },
        platform: { type: String, required: true },
      },
    ],
  },
  { timeStamp: true }
);

mongoose.models = {};
export default mongoose.model("User", UserSchema);
