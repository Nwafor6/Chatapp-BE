const Friend = require("../Models/FriendsModel");
const { decodSecretToken } = require("../util/SecretToken");

const addFriend = async (req, res) => {
    try {
        const { friendID } = req.body;
        if (!friendID) {
            return res.status(400).json({ detail: "friendID is required" });
        }

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        const friends = [friendID];

        let friend = await Friend.findOne({ user: user_id });

        const existingFriend = await Friend.findOne({ user: user_id, friends: friendID });

        if (existingFriend) {
            return res.status(400).json({ detail: "FriendID already exists in your friend list" });
        }
        if (friend) {
            // Update the existing friend recordt
            await Friend.updateOne({ user: user_id }, { $push: { friends: friendID } });
            return res.status(201).json({ detail: "Friend list updated successfully.",});
        } else {
            // Create a new friend record
            await Friend.create({
                friends: friends,
                user: user_id,
            });
        }

        return res.status(201).json({ detail: "Friend added successfully.",});
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ detail: "Internal Server Error", success: false });
    }
};

module.exports = {
    addFriend
};
