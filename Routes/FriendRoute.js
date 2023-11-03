const { addFriend } = require("../Controllers/FriendsControllers");

const router = require("express").Router();

router.post('/add-friend', addFriend)

module.exports= router;