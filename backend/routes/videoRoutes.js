const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  uploadVideo,
  getVideos,
  getVideo,
} = require("../controllers/videoController");
const router = express.Router();

router.post("/upload", protectRoute, uploadVideo);
router.get("/", protectRoute, getVideos);
router.get("/get/:id", protectRoute, getVideo);

module.exports = router;
