import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';


const PostForm = () => { 
const dispatch = useDispatch()
const [postText,setPostText] = useState('')


return(

  <div className="post-form">
  <div className="bg-primary p">
    <h3>Post Something...</h3>
  </div>
  <form className="form my-1"
  onSubmit={e => {
    e.preventDefault();
    dispatch(addPost({text:postText}))
    setPostText('')
  }}>
    <textarea
    value={postText}
    onChange={e => setPostText(e.target.value)}
      name="text"
      cols="30"
      rows="5"
      placeholder="Create a post.."
      required
    ></textarea>
    <input type="submit" className="btn btn-dark my-1" value="Submit" />
  </form>
</div>

)
}

export default PostForm