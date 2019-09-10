const express = require('express');
const router = express.Router();
const auth = require('../../middleware/isAuth');
const authController = require('../../controller/auth.js');
const { check, validationResult, body } = require('express-validator');

// @route    GET api/auth
// @desc     Test purpose
// @access   Public
router.get('/', auth, authController.getAuth);

// @route    POST api/auth
// @desc     Authenticate user & getToken
// @access   Public
router.post(
  '/signup',
  [
    check('name', '姓名必填')
      .not()
      .isEmpty(),
    check('email')
      .isEmail()
      .withMessage('請輸入有效的電子信箱')
      .normalizeEmail(),
    body('password', '至少輸入六個字，可包含英文及數字')
      .isLength({ min: 6 })
      .isString()
      .trim()
  ],
  authController.postSignup
);

// @route    POST api/auth
// @desc     Register user
// @access   Public
router.post(
  '/login',
  [
    check('email', '請輸入有效的電子信箱').isEmail(),
    body('password', '請輸入正確的密碼').exists()
  ],
  authController.postLogin
);

module.exports = router;
