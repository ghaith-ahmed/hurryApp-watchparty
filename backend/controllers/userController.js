const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/helpers");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const jwt = require("jsonwebtoken");

module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({ user: newUser, token });
      return;
    }

    res.status(400).json({ error: "Invalid user data" });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in signupUser: ${e.message}`);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPasswordCorrect = comparePassword(password, user?.password || "");

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    const token = generateTokenAndSetCookie(user._id, res);

    const signedInUser = await User.findById(user._id).select("-password");

    res.status(200).json({ user: signedInUser, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in loginUser: ${e.message}`);
  }
};

module.exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(`Error in logoutUser: ${e.message}`);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(
      token,
      "jdufh7ew47324kfgimdbjdfub794ywk9bIRHJM95784YU308JBINAT7H5Q3judhE728U3JGjBYDSGfygfe87427534lmnbm"
    );

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.sendStatus(401);

    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(`Error in protectRoute: ${e.message}`);
  }
};
