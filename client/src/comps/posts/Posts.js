import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import '../styles/Posts.css'


const Posts = () => { 
const dispatch = useDispatch()
const {posts,loading} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPosts());
},[dispatch])

return(

loading ? <Spinner/> : (
  <>
<h1 className="large text-primary" data-aos="fade-right">Posts</h1>
<p className="lead" data-aos="fade-in" data-aos-duration="2000">
  <i className="fas fa-user"></i> Welcome to the community
</p>
<PostForm />
<div className="posts">
  {posts.map(post => (
    <PostItem key={post._id} post={post} showActions={true} />
  ))}
</div>
  </>
)

)
}

export default Posts