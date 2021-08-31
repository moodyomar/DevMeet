import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match }) => {

  const { post, loading } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(match.params.id))
  }, [match.params.id, dispatch])

  return (
    loading || post === null ? <Spinner /> :
      <>
        <Link to="/posts" className='btn'>Back To Posts</Link>
        <PostItem post={post} />
        <CommentForm postId={post._id} />
        <div className="comments">
          {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </>
  )
}

export default Post