const jwt = require("jsonwebtoken");

module.exports = (userId, res) => {
  const token = jwt.sign(
    { userId },
    "jdufh7ew47324kfgimdbjdfub794ywk9bIRHJM95784YU308JBINAT7H5Q3judhE728U3JGjBYDSGfygfe87427534lmnbm",
    {
      expiresIn: "90d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60000 * 60 * 24 * 90,
    sameSite: "strict",
  });

  return token;
};
