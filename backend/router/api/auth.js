const express = require('express');
const router = express.Router();
const auth = require('../../middleware/isAuth');

const authController = require('../../controller/auth.js');

// @route    GET api/auth
// @desc     Test purpose
// @access   Public
router.get('/', auth, authController.getAuth);

// @route    POST api/auth
// @desc     Authenticate user & getToken
// @access   Public
router.post('/signup', authController.postSignup);

// @route    POST api/auth
// @desc     Register user
// @access   Public
router.post('/login', authController.postLogin);

module.exports = router;
