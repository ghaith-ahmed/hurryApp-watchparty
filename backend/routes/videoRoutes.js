const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const { uploadVideo } = require("../controllers/videoController");
const router = express.Router();

router.post("/upload", protectRoute, uploadVideo);

module.exports = router;
