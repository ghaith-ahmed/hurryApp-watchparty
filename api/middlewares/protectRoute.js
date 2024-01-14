const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(
      token,
      "jdufh7ew47324kfgimdbjdfub794ywk9bIRHJM95784YU308JBINAT7H5Q3judhE728U3JGjBYDSGfygfe87427534lmnbm"
    );

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(`Error in protectRoute: ${e.message}`);
  }
};
