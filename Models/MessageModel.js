const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    text: {
      type: String
    }
  },
  {
    timestamps: true // Enable timestamps (createdAt and updatedAt fields)
  }
);

module.exports = mongoose.model("Message", MessageSchema);
