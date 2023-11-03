const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsSchema = new mongoose.Schema(
  {
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user' // Referencing the 'user' model
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user' // Referencing the 'user' model
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt and updatedAt fields)
  }
);

module.exports = mongoose.model("friend", FriendsSchema);
