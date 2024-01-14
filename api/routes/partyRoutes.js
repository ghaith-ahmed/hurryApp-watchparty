const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  createParty,
  getParty,
  leaveParty,
  sendMessage
} = require("../controllers/partyController");
const router = express.Router();

router.post("/", protectRoute, createParty);
router.post("/leave", protectRoute, leaveParty);
router.post("/message", protectRoute, sendMessage);
router.get("/:code", protectRoute, getParty);

module.exports = router;
