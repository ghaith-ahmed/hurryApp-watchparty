const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  createParty,
  getParty,
  leaveParty,
} = require("../controllers/partyController");
const router = express.Router();

router.post("/", protectRoute, createParty);
router.post("/leave", protectRoute, leaveParty);
router.get("/:code", protectRoute, getParty);

module.exports = router;
