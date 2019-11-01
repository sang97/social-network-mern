const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const { text } = req.body;
      const newPost = new Post({
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:postId
// @desc    Get post with id
// @access  Private
router.get('/:postId', auth, async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:postId
// @desc    Delete post with id
// @access  Private
router.delete('/:postId', auth, async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ msg: 'Post not found' });

    //check if user delete the post is the owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:postId
// @desc    Like a post
// @access  Private
router.put('/like/:postId', auth, async (req, res) => {
  const postId = req.params.postId;
  try {
    //get the post
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ msg: 'Post not found' });

    //Check if the post has already been liked by user
    const index = post.likes.findIndex(
      like => like.user.toString() === req.user.id
    );

    if (index === -1) {
      //user has not liked the post
      post.likes.push({ user: req.user.id });
    } else {
      //user unlike the post
      post.likes.splice(index, 1);
    }
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts/comment/:postId
// @desc    Comment on a post
// @access  Private
router.put(
  '/comment/:postId',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const postId = req.params.postId;
    try {
      //get information of commenter
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: 'User not found' });
      const post = await Post.findById(postId);
      if (!post) return res.status(400).json({ msg: 'Post not found' });

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    Delete a comment on a post
// @access  Private
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ msg: 'Post not found' });

    //pull out comment
    const comment = post.comments.find(comment => comment.id === commentId);
    if (!comment) return res.status(400).json({ msg: 'Comment not found' });

    //check if user is the owner of the comment
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User is not authorized' });

    post.comments = post.comments.filter(comment => comment.id !== commentId);

    await post.save();

    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
