const Video = require("../models/videoModel");
const User = require("../models/userModel");

module.exports.uploadVideo = async (req, res) => {
  try {
    const { url, title, description } = req.body;

    let video = {
      url,
      user_id: req.user._id,
      title,
    };

    if (description) video.description = description;
    const user = await User.findById(req.user._id);
    const newVideo = await Video.create(video);
    user.videos.push(newVideo._id);
    await user.save();

    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in uploadVideo: ${e.message}`);
  }
};

module.exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort("-createdAt")
      .select("-url")
      .populate("user_id");

    res.status(200).json(videos);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in uploadVideo: ${e.message}`);
  }
};

module.exports.getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate("user_id");

    res.status(200).json(video);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in uploadVideo: ${e.message}`);
  }
};

module.exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user_id: req.user._id })

    res.status(200).json(videos);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in uploadVideo: ${e.message}`);
  }
}
module.exports.deleteVideo = async (req, res) => {
  try {
    const { partyId } = req.params

    await Video.deleteOne({ _id: partyId })

    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in uploadVideo: ${e.message}`);
  }
}