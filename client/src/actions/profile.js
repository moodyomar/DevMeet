import axios from 'axios'
import { API_URL } from '../utils/api';
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR} from './types';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try{
      const res = await axios.get(`${API_URL}/api/profile/me`)
      dispatch({
        type:GET_PROFILE,
        payload:res.data
      })
  } catch(err) {
      dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
      })
  }
  
}
