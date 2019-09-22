const express = require('express');
const router = express.Router();
const auth = require('../../middleware/isAuth');
const authController = require('../../controller/auth.js');
const { check, validationResult, body } = require('express-validator');

// @route    GET /auth
// @desc     Test purpose
// @access   Public
router.get('/', auth, authController.getAuth);

// @route    POST /auth/signup
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

// @route    POST /auth/login
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

//TODO: ADD Friend

// @route    GET /auth/friend
// @desc     get all of friends from user
// @access   Private

// router.get('/friend', auth, authController.getFriends);

// @route    GET /auth/pending
// @desc     get all of pending friend from user
// @access   Private

router.get('/pending', auth, authController.getPendingFriends);

// // @route    PUT /auth/waiting
// // @desc     get all of friends from user
// // @access   Private
router.put(
  '/pending/accept/:pending_Id',
  auth,
  authController.acceptPendingFriends
);

// @route    DELETE /auth/reject
// @desc     reject user who wants to be a friend with you
// @access   Private
router.delete(
  '/pending/reject/:pending_Id',
  auth,
  authController.rejectPendingFriends
);

module.exports = router;
