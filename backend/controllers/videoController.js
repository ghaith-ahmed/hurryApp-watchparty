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
