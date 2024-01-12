const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getuser", getUser);

module.exports = router;
