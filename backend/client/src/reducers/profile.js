import * as GET from '../actions/type';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  skill: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET.GET_PROFILE:
    case GET.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };

    case GET.CER_SKILL:
      return {
        ...state,
        skill: state.profile.skills.map(skill =>
          skill._id === payload.skillId
            ? { ...skill, certificated: payload.cer }
            : skill
        ),

        loading: false
      };
    default:
      return state;
  }
};
