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

            
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ detail: "Internal Server Error", success: false });
    }
};

const GetChat= async (req, res) =>{
    try{
        const  friendID=req.query.friendID;
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        if (friendID){
            const members = [friendID, user_id];
            const existingChat = await Chat.findOne({ members: members });
            return res.status(200).json(existingChat);
        }

        const existingChat = await Chat.find({ members: { $in: [user_id] } });
        return res.status(200).json(existingChat);
        

    }catch(error){
        return res.status(500).json(error)
    }
}

module.exports = {
    addChat,
    GetChat
};
