const Chat = require("../Models/ChatModel");
const { decodSecretToken } = require("../util/SecretToken");

const addChat = async (req, res) => {
    try {
        const { friendID } = req.body;
        if (!friendID) {
            return res.status(400).json({ detail: "friendID and userID are required" });
        }

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        const members = [friendID, user_id];

        // Check if the chat already exists with the specified members
        const existingChat = await Chat.findOne({ members: members });

        if (existingChat !== null) {
            return res.status(400).json({ detail: "Chat already exists with these members" });
        }

        // Create a new chat record
        await Chat.create({
            members: members,
        });

        return res.status(201).json({ detail: "Chat added successfully." });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ detail: "Internal Server Error", success: false });
    }
};

module.exports = {
    addChat
};
