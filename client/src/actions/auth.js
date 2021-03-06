import axios from 'axios';
import { toast } from "react-toastify";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES
} from '../actions/types'; import setAuthToken from '../utils/setAuthToken';


// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// Add User to favorites
export const addToFavorites = userId => async dispatch => {
  try {
    await axios.patch(`/api/users/addtofav`, { favorites: userId });

    dispatch({
      type: ADD_TO_FAVORITES,
      payload: userId
    });
    toast.success('User have been added to favorites!');
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
  }
}
// Delete User from favorites
export const deleteFromFavorites = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/delfromfav/${userId}`);

    dispatch({
      type: DELETE_FROM_FAVORITES,
      payload: userId
    });
    toast.success('User have been Unfollowed');
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
  }
}


// Register User - with inside dispatch + mapStateToProps
export const register = ({ name, email, password }) => async dispatch => {

  try {
    const res = await axios.post(`/api/users`, { name, email, password })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser());
    toast.success(`Welcome to DevMeet ${name.split(' ')[0]} 👋`)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}



// Login User - with outside dispatch + hooks
export const login = (email, password) => async dispatch => {

  try {
    const res = await axios.post(`/api/auth`, { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser());
    toast.success("Logged in successfully")
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}


// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
  toast.dark("See you later 👋")
}
