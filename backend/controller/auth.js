const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
// const io = require('../socket');

// @route    GET auth
// @desc     Test route
// @access   Public
exports.getAuth = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT api/auth/logout
// @desc     Authenticate user & getToken
// @access   Public
exports.putLogout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.active = false;
    await user.save();

    //TODO: In the future, I will create a friend list that need to load all the
    // user who's active is true. "I will need to use socket.io push newest status on the front end"
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    POST api/auth
// @desc     Authenticate user & getToken
// @access   Public
exports.postLogin = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: '帳密無效' }] });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: '帳密有誤' }] });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 60000 },
      (error, token) => {
        if (error) {
          throw error;
        }
        console.log(token);
        res.json({ token });
      }
    );
    user.active = true;

    await user.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    POST api/auth
// @desc     Register user
// @access   Public
exports.postSignup = async (req, res, next) => {
  // User create the from and send the request to our server

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: [{ msg: '此帳號已經被註冊了' }] });
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    //you can use ES6 syntax, replace "name: name" to "name" and so on...
    user = new User({
      name: name,
      email: email,
      avatar: avatar,
      password: password
    });
    const hashPassword = await bcryptjs.hash(password, 12);
    user.password = hashPassword;

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 60000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    user.active = true;

    await user.save();
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /auth/friend/:userId
// @desc     get all of friends from user
// @access   Private

exports.getFriends = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const allfriends = await User.findById(userId).select('friends');
    res.json(allfriends);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE /auth/friend/:friend_id
// @desc     DELETE one of your friends
// @access   Private

exports.delFriend = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const delId = req.params.friend_id;

    const allfriends = await User.findById(userId).select('friends');

    const removeIndex = allfriends.friends.findIndex(
      u => u.friendData.id.toString() === delId.toString()
    );
    allfriends.friends.splice(removeIndex, 1);
    await allfriends.save();
    res.json(allfriends);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /auth/pending/userId
// @desc     get all of pending friend from user
// @access   Private

exports.getPendingFriends = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const users = await User.findById(userId).select('pendingfriends');

    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT /auth/pending/accept/:pending_Id
// @desc     accept user who wants to be a friend with you
// @access   Private

exports.acceptPendingFriends = async (req, res, next) => {
  try {
    const newfriendsPendingId = req.params.pending_Id;
    const userId = req.user.id;
    const user = await User.findById(userId).select([
      'name',
      'avatar',
      'friends',
      'pendingfriends'
    ]);

    const sender = await User.findById(newfriendsPendingId).select('friends');
    sender.friends.unshift({
      friendData: {
        id: userId,
        name: user.name,
        avatar: user.avatar
      }
    });
    await sender.save();
    const prepareTransToFriend = user.pendingfriends.findIndex(
      u => u._id.toString() === newfriendsPendingId.toString()
    );

    const temp = user.pendingfriends.splice(prepareTransToFriend, 1);

    user.friends.unshift({
      friendData: {
        id: temp[0].pendingData.id,
        name: temp[0].pendingData.name,
        avatar: temp[0].pendingData.avatar
      }
    });
    await user.save();
    res.json(user.pendingfriends);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    DELETE /auth/pending/reject/:pending_id
// @desc     reject user who wants to be a friend with you
// @access   Private

exports.rejectPendingFriends = async (req, res, next) => {
  try {
    const newfriendsPendingId = req.params.pending_Id;
    const userId = req.user.id;
    const user = await User.findById(userId).select([
      'friends',
      'pendingfriends'
    ]);
    const prepareTransToFriend = user.pendingfriends.findIndex(
      u => u._id.toString() === newfriendsPendingId.toString()
    );

    //  user.pendingfriends.splice(prepareTransToFriend, 1);

    await user.save();
    res.json(user.pendingfriends);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};
