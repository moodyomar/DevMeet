const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text:{
        type:String,
        required:true
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date:{
        type:Date,
        default:Date.now
      }
    }
  ],
  date:{
    type:Date,
    default:Date.now
  }

});

module.exports = Post = mongoose.model('post',PostSchema)