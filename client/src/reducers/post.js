import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from "../actions/types"


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

    case GET_POST:
    return {...state,post:payload,loading:false};

    case ADD_POST:
    return {...state,
      posts:[payload,...state.posts],
      loading:false};

    case DELETE_POST:
    return {...state,
      posts:state.posts.filter(post => post._id !== payload),
      loading:false};

    case POST_ERROR:
    return {...state,error:payload,loading:false};

    case UPDATE_LIKES:
    return {...state,
      posts:state.posts.map(post => post._id === payload.postId ? {...post,likes:payload.likes} : post),
      loading:false};

      case ADD_COMMENT:
        return {...state,post:{...state.post,comments:payload},loading:false}

        case REMOVE_COMMENT:
          return {...state,
            post:{...state.post,
              comments:state.post.comments.filter(comment => comment._id !== payload)
            },loading:false
          };

    default:
      return state;
  }
}