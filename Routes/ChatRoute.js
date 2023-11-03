const { addChat, GetChat } = require("../Controllers/ChatControllers");

const router = require("express").Router();

router.post('/add-chat', addChat)
router.get('/get-chat', GetChat)


module.exports= router;