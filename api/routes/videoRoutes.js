const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  uploadVideo,
  getVideos,
  getVideo,
  getUserVideos,
  deleteVideo,
  editVideo,
} = require("../controllers/videoController");
const router = express.Router();

router.post("/upload", protectRoute, uploadVideo);
router.post("/edit", protectRoute, editVideo);
router.get("/", protectRoute, getVideos);
router.get("/get/:id", protectRoute, getVideo);
router.get("/getyourvideos", protectRoute, getUserVideos);
router.post("/delete/:partyId", protectRoute, deleteVideo);

module.exports = router;
