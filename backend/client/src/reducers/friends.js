import * as GET from '../actions/type';

const initialState = {
  friends: [],
  pending: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET.GET_PENDING:
      return {
        ...state,
        pending: payload,
        loading: false
      };

    case GET.GET_FRIEND:
      return {
        ...state,
        friends: payload,
        loading: false
      };
    case GET.FRIEND_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
