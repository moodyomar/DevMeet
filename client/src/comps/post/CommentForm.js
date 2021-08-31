import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';


const CommentForm = ({postId}) => { 

let [commentText,setCommentText] = useState('');
const dispatch = useDispatch();

return(

  <div className="post-form">
  <div className="bg-primary p">
    <h3>Leave a Comment...</h3>
  </div>
  <form className="form my-1"
  onSubmit={e => {
    e.preventDefault();
    dispatch(addComment(postId,{text:commentText}))
    setCommentText('')
  }}>
    <textarea
    value={commentText}
    onChange={e => setCommentText(e.target.value)}
      name="text"
      cols="30"
      rows="5"
      placeholder="Leave a Comment.."
      required
    ></textarea>
    <input type="submit" className="btn btn-dark my-1" value="Submit" />
  </form>
</div>

)
}

export default CommentForm