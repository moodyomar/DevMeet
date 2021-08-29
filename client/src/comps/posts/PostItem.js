import React from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';


const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date } }) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class="my-1">
          {text}
        </p>
        <p class="post-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button onClick={() => dispatch(addLike(_id))} type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && (
            <span>{likes.length}</span>
          )}
        </button>
        <button onClick={() => dispatch(removeLike(_id))} type="button" class="btn btn-light">
          <i class="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion {comments.length > 0 && (
            <span class='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
        )}

      </div>
    </div>
  )

}

export default PostItem