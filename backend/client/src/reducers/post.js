import * as GET from '../actions/type';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET.GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case GET.ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case GET.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== payload),
        loading: false
      };
    case GET.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    default:
      return state;
  }
};
