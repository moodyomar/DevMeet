import axios from 'axios'
import {setAlert} from './alert';
import { GET_POSTS, POST_ERROR } from "../actions/types"
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
    // payload:{msg:err.response.statusText,status:err.response.status}
    payload: { msg: err.response, status: err.response }
  });
}
}
