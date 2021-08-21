import axios from 'axios';
import {setAlert} from '../actions/alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,CONSOLE_LOG
} from '../actions/types';import setAuthToken from '../utils/setAuthToken';

import { API_URL } from '../utils/api';

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
try {
  const res = await axios.get(`${API_URL}/api/auth`);
  dispatch({
    type:USER_LOADED,
    payload:res.data
  })
} catch (error) {
  dispatch({
    type:AUTH_ERROR,
  })
}
}


// Register User - with inside dispatch + mapStateToProps
export const register = ({name,email,password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const body = JSON.stringify({name,email,password});

  try {
    const res = await axios.post(`${API_URL}/api/users`,body,config)
    dispatch({
      type:REGISTER_SUCCESS,
      payload:res.data
    })
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({
      type:REGISTER_FAIL
    })
  }
}



// Login User - with outside dispatch + hooks
export const login = (email,password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const body = JSON.stringify({email,password});

  try {
    const res = await axios.post(`${API_URL}/api/auth`,body,config)
    dispatch({
      type:LOGIN_SUCCESS,
      payload:res.data
    })
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({
      type:LOGIN_FAIL
    })
  }
}


// Logout / Clear Profile
export const logout = () => {
  return{type:LOGOUT}
}

export const consoleLog = () => {
  return{type:CONSOLE_LOG}
}