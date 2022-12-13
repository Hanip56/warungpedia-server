const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please add all required field");
  }

  const exist = await User.findOne({ email });

  if (exist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: user.getSignedToken(),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const exist = await User.findOne({ email });

  if (!exist) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  const isMatch = await exist.matchPassword(password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    _id: exist._id,
    name: exist.name,
    email: exist.email,
    token: exist.getSignedToken(),
  });
});

const getMe = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
