import axios from 'axios'
import {setAlert} from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/types"
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