const mongoose = require("mongoose");

const partySchema = mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    code: {
      type: "String",
      required: true,
      unique: true,
    },
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    messages: {
      type: [{
        sender_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
        },
        text: {
          type: String,
        }
      }]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Party", partySchema);
