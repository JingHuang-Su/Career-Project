import * as GET from '../actions/type';

const initialState = {
  msg: [],
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET.GET_MSG:
      return {
        ...state,
        msg: payload,
        loading: false
      };

    default:
      return state;
  }
};
