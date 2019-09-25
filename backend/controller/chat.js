const User = require('../model/User');
const Chat = require('../model/Chat');
// @route    GET /message/:user_id
// @desc     send msg to the people who match "user_id"
// @access   Private

// pseudo code
// get req.user.id from header(JWT)
// get "receiver" id from params
// from chat collection to collect all the msg between receiver and me

exports.getmsg = async (req, res, next) => {
  try {
    const myId = req.user.id;
    const receiverId = req.params.userId;
    const myfriends = await User.findById(myId).select('friends');
    const target = myfriends.friends.find(
      friend => friend.friendData.id.toString() === receiverId.toString()
    );
    if (target.hasbeenmsg) {
      const data = await Chat.find({
        $and: [
          { $or: [{ from: myId }, { from: receiverId }] },
          { $or: [{ to: receiverId }, { to: myId }] }
        ]
      });
      res.status(201).json(data);
    } else {
      res.status(201).send('no info here');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    POST /message/:user_id
// @desc     send msg to the people who match "user_id"
// @access   Private

// pseudo code
// we need body, sender, receiver and time
// get req.user.id from header(JWT) and set
// get body(msg text) from req.body
// get receiver id from req.params
// store those info to "chat DB"

exports.postmsg = async (req, res, next) => {
  try {
    const myId = req.user.id;
    const receiverId = req.params.userId;

    let date = new Date();
    const localeSpecificTime = date.toLocaleTimeString();
    date = localeSpecificTime.replace(/:\d+ /, ' ');

    const newMsg = new Chat({
      from: myId,
      to: receiverId,
      body: req.body.msg,
      time: date,
      timestamp: new Date().getTime().toString()
    });
    const msg = await newMsg.save();

    res.json(msg);

    let myfriends = await User.findById(myId).select('friends');
    let target = myfriends.friends.find(
      friend => friend.friendData.id.toString() === receiverId.toString()
    );
    if (!target.hasbeenmsg) {
      target.hasbeenmsg = true;
    }
    await myfriends.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
