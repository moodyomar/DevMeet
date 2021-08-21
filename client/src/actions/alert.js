import {v4 as uuid} from "uuid"; 
import {REMOVE_ALERT, SET_ALERT} from './types';

// course way using connect()(component)  passing props
export const setAlert = (msg,alertType,timeout=3000) => dispatch => {
const id = uuid();
dispatch({
  type:SET_ALERT,
  payload:{msg,alertType,id}
});
setTimeout(() => dispatch({type:REMOVE_ALERT,payload:id}),timeout);
}

// my way using dipatch in comp no passin props
// export const setAlert2 = (msg,alertType) => {
//   const id = uuid();
//   return {
//       type:SET_ALERT,
//       payload:{msg,alertType,id}
//   }
// }