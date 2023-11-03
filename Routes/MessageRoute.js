const { GetMessages, addMessage } = require("../Controllers/MessageController");

const router = require("express").Router();

router.post('/send-message', addMessage)
router.get('/get-messages', GetMessages)


module.exports= router;