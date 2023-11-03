const { addChat } = require("../Controllers/ChatControllers");

const router = require("express").Router();

router.post('/add-chat', addChat)

module.exports= router;