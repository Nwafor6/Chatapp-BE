const Friend = require("../Models/FriendsModel");
const Message = require("../Models/MessageModel");
const Chat = require("../Models/ChatModel");
const { decodSecretToken } = require("../util/SecretToken");

const addMessage = async (req, res) => {
    try {
        const { chatId, text} = req.body;
        if (!chatId) {
            return res.status(400).json({ detail: " chatId fields is required" });
        }

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        // Check if the chat ID exist
        let chat = await Chat.findOne({ _id: chatId, members: { $in: [user_id] } });

        if (!chat) {
            return res.status(400).json({ detail: "Chat does not exists in your chat list" });
        } 
        // Create a new friend record
        const message =await Message.create({
            chatId: chatId,
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
        const  chatId=req.query.chatId;
        if (!chatId) return res.status(400).json({ detail: "chatId and userID are required" });

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ detail: "Token not present" });
        }

        const user_id = decodSecretToken(token);
        let chat = await Chat.findOne({ _id: chatId, members: { $in: [user_id] } });
        if (!chat) {
            return res.status(400).json({ detail: "Chat does not exists in your chat list" });
        } 
        let messages = await Message.find({ senderId: user_id, chatId: chatId});
        return res.status(200).json(messages)

    }catch(error){
        return res.status(500).json(error)
    }
}
module.exports = {
    addMessage,
    GetMessages
};
