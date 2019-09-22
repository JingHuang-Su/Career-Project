const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

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
      { expiresIn: 360000 },
      (error, token) => {
        if (error) {
          throw error;
        }
        console.log(token);
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(err.message);
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
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /auth/pending
// @desc     get all of pending friend from user
// @access   Private

exports.getPendingFriends = async (req, res, next) => {
  try {
    const userId = req.user.id;
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
      'friends',
      'pendingfriends'
    ]);

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
    res.json(user);
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

    const remove = user.pendingfriends.splice(prepareTransToFriend, 1);

    await user.save();
    res.json(remove);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};
