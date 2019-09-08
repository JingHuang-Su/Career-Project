const Post = require('../model/Post');
const Profile = require('../model/Profile');
const User = require('../model/User');

// @route    POST /
// @desc     Create a post
// @access   Private
exports.createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    const newPost = new Post({
      text: req.body.text,
      category: req.body.category,
      title: req.body.title,
      name: user.name,
      avatar: user.avatar,
      user: userId
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /
// @desc     Get all posts
// @access   Public

exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /
// @desc     Get experience posts
// @access   Public

exports.getExperiencePost = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: '心得' }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /
// @desc     Get consult post
// @access   Public

exports.getConsultPost = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: '請益' }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /
// @desc     Get talk
// @access   Public

exports.getTalkPost = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: '閒聊' }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /
// @desc     Get news posts
// @access   Public

exports.getNewsPost = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: '新聞' }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /
// @desc     Get question posts
// @access   Public

exports.getQuestionPost = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: '問題' }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET /:id
// @desc     Get post by ID
// @access   Public
exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: '沒有找到此一文章' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE /:id
// @desc     Delete a post
// @access   Private

exports.delPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: '沒有找到此一文章' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '沒有權限刪除此一文章' });
    }

    await post.remove();
    res.json({ msg: '已刪除此一文章' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT like/:id
// @desc     Like a post
// @access   Private

exports.putLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: '此一文章已按讚過了' });
    }
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT unlike/:id
// @desc     Like a post
// @access   Private

exports.putUnLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: '還未按讚過' });
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    Post comment/:id
// @desc     Comment on a post
// @access   Private

exports.postComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    const user = await User.findById(userId).select('-password');
    const post = await Post.findById(postId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
exports.delComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const commentId = req.params.comment_id;
    const post = await Post.findById(postId);
    const comment = post.comments.find(comment => comment.id === commentId);

    if (!comment) {
      return res.status(404).json({ msg: '未找到您的留言' });
    }

    if (comment.user.toString() !== userId) {
      return res.status(401).json({ msg: '沒有權限刪除此文章' });
    }

    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(commentId);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
