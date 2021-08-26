import { REMOVE_ALERT, SET_ALERT } from '../actions/types';


const initialState = [

];

export const alert = (state = initialState, {type,payload}) => {
  switch (type) {
    case SET_ALERT:

      return [...state, payload]

    case REMOVE_ALERT:

      return state.filter(alert => alert.id !== payload);

    default:
      return state;
  }
}