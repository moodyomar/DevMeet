import { GET_POSTS, POST_ERROR } from "../actions/types"


const initialState ={
  posts:[],
  post:null,
  loading:true,
  error:{}
}

export const post = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
    return {...state,posts:payload,loading:false};

    case POST_ERROR:
    return {...state,error:payload,loading:false};

    default:
      return state;
  }
}