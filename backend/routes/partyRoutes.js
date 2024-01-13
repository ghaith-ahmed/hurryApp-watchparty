const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const { createParty, getParty } = require("../controllers/partyController");
const router = express.Router();

router.post("/", protectRoute, createParty);
router.get("/:code", protectRoute, getParty);

module.exports = router;
