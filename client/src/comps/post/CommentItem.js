import React from 'react';
import { deleteComment } from '../../actions/post';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment'

const CommentItem = ({ comment: { _id, text, name, avatar, user, date }, postId }) => {

const dispatch = useDispatch()
const auth = useSelector(state => state.auth)
return(

  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img src={avatar} alt="" className="round-img" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted On{' '}
        <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {!auth.loading && auth.user._id && (
        <button onClick={() => dispatch(deleteComment(postId,_id))} 
        className="btn btn-danger" type="button"><div className="fas fa-times"></div></button>
      )}
    </div>
  </div>

)
      }

export default CommentItem