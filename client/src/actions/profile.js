import axios from 'axios'
import { API_URL } from '../utils/api';
import { setAlert } from './alert';
import { CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/profile/me`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // payload:{msg:err.response.statusText,status:err.response.status}
      payload: { msg: err.response, status: err.response }
    });
  }

};


// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {

    const res = await axios.post(`${API_URL}/api/profile`, formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {

    const res = await axios.put(`${API_URL}/api/profile/experience`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {

    const res = await axios.put(`${API_URL}/api/profile/education`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_URL}/api/profile/experience/${id}`)
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('Experience Removed', 'danger'));

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_URL}/api/profile/education/${id}`)
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('Education Removed', 'danger'));

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete Account & Profile
export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')){
    try {
      const res = await axios.delete(`${API_URL}/api/profile`)
      dispatch({type:CLEAR_PROFILE})
      dispatch({type:ACCOUNT_DELETED})
      dispatch(setAlert('Your account has been permanatly deleted'));
  
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  
  }
}
