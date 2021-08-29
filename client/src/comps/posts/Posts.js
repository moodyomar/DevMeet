import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';


const Posts = () => { 
const dispatch = useDispatch()
const {posts,loading} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPosts());
},[dispatch])

return(

<div className=''>
<h1>Posts</h1>
</div>

)
}

export default Posts