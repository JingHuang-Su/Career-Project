const express = require('express');
const router = express.Router();
const auth = require('../../middleware/isAuth');
const chatController = require('../../controller/chat.js');

// @route    GET /message/:user_id
// @desc     send msg to the people who match "user_id"
// @access   Private

router.get('/:userId', auth, chatController.getmsg);

// pseudo code
// get req.user.id from header(JWT)
// get "receiver" id from params
// from chat collection to collect all the msg between receiver and me
// Message.find({
//     $and: [
//         { $or: [{from: me}, {from: friend}] },
//         { $or: [{to: me}, {to: friend}] }
//     ]
// }

// @route    POST /message/:user_id
// @desc     send msg to the people who match "user_id"
// @access   Private

router.post('/:userId', auth, chatController.postmsg);

// pseudo code
// we need body, sender, receiver and time
// get req.user.id from header(JWT) and set
// get body(msg text) from req.body
// get receiver id from req.params
// store those info to "chat DB"

module.exports = router;
