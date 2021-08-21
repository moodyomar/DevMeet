import axios from 'axios';
import {setAlert} from '../actions/alert';

import {REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/types';
import { API_URL } from '../comps/auth/api';

// Register User
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

