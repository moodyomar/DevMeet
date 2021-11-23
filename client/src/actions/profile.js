import axios from 'axios'
import { API_URL } from '../utils/api';
import { toast } from "react-toastify";
import { CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from './types';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/me`)
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

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get(`/api/profile`)
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }

};


// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }

};


// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }

};


// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {

    const res = await axios.post(`/api/profile`, formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    toast.success(edit ? 'Profile Updated' : 'Profile created');
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
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

    const res = await axios.put(`/api/profile/experience`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    toast.success('Experience Added');
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
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

    const res = await axios.put(`/api/profile/education`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    toast.success('Education Added');
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
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
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    toast.success('Experience Removed');

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
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    toast.warning('Education Removed');

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete Account & Profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/profile`)
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
      toast.warning('Your account has been permanatly deleted');

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }

  }
}
