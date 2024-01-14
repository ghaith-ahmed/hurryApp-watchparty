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
      members: [req.user._id],
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

    const party = await Party.findOne({ code })
      .populate("host")
      .populate("video")
      .populate("members");

    if (
      !party.members
        .map((member) => member._id.toString())
        .includes(req.user._id.toString())
    ) {
      party.members.push(req.user._id);
      await party.save();
    }

    res.status(200).json(party);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in getParty: ${e.message}`);
  }
};

module.exports.leaveParty = async (req, res) => {
  try {
    const { partyId } = req.body;

    if (!partyId) return res.status(400);

    const party = await Party.findById(partyId);

    if (
      party.members
        .map((member) => member.toString())
        .includes(req.user._id.toString())
    ) {
      party.members = party.members.filter(
        (member) => member.toString() != req.user._id.toString()
      );

      await party.save();
      if (party.members.length == 0) {
        await Party.deleteOne({ _id: partyId });
      }
    }

    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in getParty: ${e.message}`);
  }
};

module.exports.sendMessage = async (req, res) => {
  try {

    const { partyId, text } = req.body;

    if (!partyId || !text) return res.status(400);

    const party = await Party.findById(partyId);

    party.messages.push({ sender_id: req.user._id, text })

    await party.save()
    res.status(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(`Error in getParty: ${e.message}`);
  }
};
