const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsSchema = new mongoose.Schema(
  {
    friends: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt and updatedAt fields)
  }
);

module.exports = mongoose.model("friend", FriendsSchema);
