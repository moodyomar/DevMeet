import axios from 'axios'
import { toast } from "react-toastify";
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from "../actions/types"


// Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`/api/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data
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
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
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
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
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
  if (window.confirm('Are you sure you want to delete your post?')) {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
      toast.warning('Post Removed')
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
    const res = await axios.post(`/api/posts`, postText);

    dispatch({
      type: ADD_POST,
      payload: res.data
    })
    toast.success('Post Created')
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
}

// Get Post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
}

// Add comment
export const addComment = (postId, fromData) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, fromData);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })
    toast.success('Comment added')
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
}


// Remove comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })
    toast.warning('Comment Removed')
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
}