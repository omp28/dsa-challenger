// create a endpoint to register the user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const User = require("../models/User").default;
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const user = new User({
    name,
    email,
    password: hash,
  });
  await user.save();
  res.status(200).json({
    message: "User registered successfully",
  });
});
