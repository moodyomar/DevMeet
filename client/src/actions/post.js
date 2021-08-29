import axios from 'axios'
import {setAlert} from './alert';
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/types"
import { API_URL } from '../utils/api';


// Get Posts
export const getPosts = () => async dispatch => {
try {
  const res = await axios.get(`${API_URL}/api/posts`);
  dispatch({
    type:GET_POSTS,
    payload:res.data
  })
} catch (err) {
  dispatch({
    type: POST_ERROR,
    payload: { msg: err.response, status: err.response }
  });
}
}

// Add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`${API_URL}/api/posts/like/${postId}`);
    dispatch({
      type:UPDATE_LIKES,
      payload:{postId,likes:res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
  }


  // Remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`${API_URL}/api/posts/unlike/${postId}`);
    dispatch({
      type:UPDATE_LIKES,
      payload:{postId,likes:res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });

  }
  }

    // Delete post
export const deletePost = postId => async dispatch => {
  if(window.confirm('Are you sure you want to delete your post?')){
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`);
      dispatch({
        type:DELETE_POST,
        payload:postId
      })
      dispatch(setAlert('Post Removed','success'))
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response, status: err.response }
      });
    }
  }
  }

    // Add post
export const addPost = postText => async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/posts`,postText);
      console.log('ininin');
      
      dispatch({
        type:ADD_POST,
        payload:res.data
      })
      dispatch(setAlert('Post Created!','success'))
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response, status: err.response.status }
      });
    }
  }