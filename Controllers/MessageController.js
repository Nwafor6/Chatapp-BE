const Friend = require("../Models/FriendsModel");
const Message = require("../Models/MessageModel");
const Chat = require("../Models/ChatModel");
const { decodSecretToken } = require("../util/SecretToken");

const addMessage = async (req, res) => {
    try {
        const { friendID, text} = req.body;
        if (!friendID) {
            return res.status(400).json({ detail: " friendID fields is required" });
        }

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        members=[user_id, friendID]
        // Check if the chat ID exist
        let chat = await Chat.findOne({members: { $all: members } });

        if (!chat) {
            chat = await Chat.create({members: members})
            // return res.status(400).json({ detail: "Chat does not exists in your chat list" });
        } 
        // Create a new friend record
        const message =await Message.create({
            chatId: chat._id,
            senderId: user_id,
            text:text
        });


        return res.status(201).json(message);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ detail: "Internal Server Error", success: false });
    }
};

const GetMessages= async (req, res)=>{
    try{
        const  friendID=req.query.friendID;
        if (!friendID) return res.status(400).json({ detail: "friendID  are required" });

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        const members=[user_id, friendID]
        let chat = await Chat.findOne({ members: { $all: members } });
        if (!chat) {
            return res.status(200);
        } 
        let messages = await Message.find({  chatId: chat._id});
        return res.status(200).json(messages)

    }catch(error){
        return res.status(500).json(error)
    }
}
module.exports = {
    addMessage,
    GetMessages
};
