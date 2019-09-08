const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const config = require('config');

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
  const { email, password } = req.body;
  try {
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
  const { name, email, password } = req.body;

  try {
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
