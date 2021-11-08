import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deletePost, removeLike } from '../../actions/post';


const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date},showActions }) => {

  const [onLike,setOnLike] = useState(false)
  const [onDisLike,setOnDisLike] = useState(false)
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <div className="post bg-white p-1 my-1" data-aos="zoom-in">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt={`${name} profile`}
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && <>
          <button disabled={onLike} onClick={() => {
            dispatch(addLike(_id))
            setOnLike(n => !n);
            setOnDisLike(false);
          }} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && (
            <span>{likes.length}</span>
          )}
        </button>
        <button disabled={onDisLike} onClick={() => {
          dispatch(removeLike(_id))
          setOnDisLike(n => !n);
          setOnLike(false);
          }} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button onClick={() => dispatch(deletePost(_id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
         </>}
        

      </div>
    </div>
  )

}

export default PostItem