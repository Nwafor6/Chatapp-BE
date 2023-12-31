const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    members:  [{
      type: Schema.Types.ObjectId,
      ref: 'user' // Referencing the 'user' model
    }],
  },
  {
    timestamps: true // Enable timestamps (createdAt and updatedAt fields)
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
