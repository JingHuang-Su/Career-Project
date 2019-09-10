const express = require('express');
const router = express.Router();
const auth = require('../../middleware/isAuth');

const postsController = require('../../controller/posts');
const { check, validationResult, body } = require('express-validator');
// @route    POST /
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    check('text', '請輸入文字')
      .not()
      .isEmpty(),
    check('title', '請輸入標題')
      .not()
      .isEmpty(),
    check('category', '請輸入類別')
      .not()
      .isEmpty()
  ],
  auth,
  postsController.createPost
);

// @route    GET /
// @desc     Get all posts
// @access   Public
router.get('/', postsController.getPost);

// @route    GET /
// @desc     Get Exp posts
// @access   Public
router.get('/exp', postsController.getExperiencePost);
// @route    GET /
// @desc     Get Consult posts
// @access   Public
router.get('/consult', postsController.getConsultPost);
// @route    GET /
// @desc     Get Talk posts
// @access   Public
router.get('/talk', postsController.getTalkPost);
// @route    GET /
// @desc     Get News posts
// @access   Public
router.get('/news', postsController.getNewsPost);
// @route    GET /
// @desc     Get all posts
// @access   Public
router.get('/question', postsController.getQuestionPost);
// @route    GET /:id
// @desc     Get post by ID
// @access   Public
router.get('/:id', postsController.getPostById);

// @route    DELETE /:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, postsController.delPostById);

// @route    PUT like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, postsController.putLike);

// @route    PUT unlike/:id
// @desc     Like a post
// @access   Private
router.put('/unlike/:id', auth, postsController.putUnLike);

// @route    comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [
    check('text', '請輸入文字')
      .not()
      .isEmpty()
  ],
  auth,
  postsController.postComment
);

// @route    DELETE comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, postsController.delComment);
module.exports = router;
