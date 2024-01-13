const Video = require("../models/videoModel");
const User = require("../models/userModel");
const Party = require("../models/partyModel");
const crypto = require("crypto");

module.exports.createParty = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) return res.status(400);

    const code = crypto.randomBytes(6).toString("hex");

    const party = await Party.create({
      host: req.user._id,
      video: videoId,
      code,
    });

    res.status(200).json({ code });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in createParty: ${e.message}`);
  }
};

module.exports.getParty = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) return res.status(400);

    const party = await Party.find({ code }).populate("host").populate("video");

    res.status(200).json(party);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in getParty: ${e.message}`);
  }
};
