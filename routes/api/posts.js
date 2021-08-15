const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post("/", [auth, [
  check('text', 'Text is required').notEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password')

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


  // @route   GET api/posts
  // @desc    Get all posts
  // @access  Private
  router.get("/", auth, async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  })


  // @route   GET api/posts/:id
  // @desc    Get post by ID
  // @access  Private
  router.get("/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if(!post){
        return res.status(404).json({msg:"Post not found"})
      }
      res.json(post)

    } catch (err) {
      console.error(err.message);
      if(err.kind === "ObjectId"){
        return res.status(404).json({msg:"Post not found"})
      }
      res.status(500).send('Server Error');
    }
  });


  // @route   DELETE api/posts
  // @desc    Delete a all
  // @access  Private
  router.delete("/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if(!post){
        return res.status(404).json({msg:"Post not found"})
      }

      // Check user
      if(post.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'User not authorized'});
      }
      await post.remove();
      res.json({msg:"Post removed"})

    } catch (err) {
      console.error(err.message);
      if(err.kind === "ObjectId"){
        return res.status(404).json({msg:"Post not found"})
      }
      res.status(500).send('Server Error');
    }

  })


  // @route   PUT api/posts/like/:id
  // @desc    Like a post
  // @access  Private
router.put("/like/:id",auth,async(req,res) => {
  try{
      const post = await Post.findById(req.params.id);

      // check if post already been liked by user
      if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
        return res.status(400).json({msg:"You already liked this post"});
      }
      post.likes.unshift({user:req.user.id});
      await post.save();
      res.json(post.likes);
  } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
  
})


  // @route   PUT api/posts/unlike/:id
  // @desc    Unlike a post
  // @access  Private
  router.put("/unlike/:id",auth,async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
  
        // check if post already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
          return res.status(400).json({msg:"Post has not yet been likes"});
        }
        //  Get the remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
  })
  

module.exports = router;