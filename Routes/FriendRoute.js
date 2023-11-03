const { addFriend, GetFriendsList } = require("../Controllers/FriendsControllers");

const router = require("express").Router();

router.post('/add-friend', addFriend)
router.get("/friends", GetFriendsList)

module.exports= router;