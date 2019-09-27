import uuid from 'uuid';
import * as GET from './type';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setHeaderConfig } from '../utils/setHeaderConfig';
import openSocket from 'socket.io-client';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: GET.SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: GET.REMOVE_ALERT, payload: id }), timeout);
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');
    dispatch({
      type: GET.USER_LOADED,
      payload: res.data
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: GET.AUTH_ERROR
    });
  }
};

export const userSignup = ({ name, email, password }) => async dispatch => {
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/auth/signup', body, setHeaderConfig);

    dispatch({
      type: GET.SIGNUP_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: GET.SIGNUP_FAIL
    });
  }
};

export const loginUser = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth/login', body, setHeaderConfig);

    dispatch({
      type: GET.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.error(error);
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    dispatch({
      type: GET.LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  // dispatch({ type: CLEAR_PROFILE });
  axios.put('/auth/logout');
  dispatch({ type: GET.LOGOUT });
};

//POST and POSTS

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/post/${id}`);

    dispatch({
      type: GET.DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData, history) => async dispatch => {
  try {
    const res = await axios.post('/post', formData, setHeaderConfig);

    dispatch({
      type: GET.ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('成功發佈', 'success'));

    history.push('/posts');
  } catch (err) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPosts = (category = null) => async dispatch => {
  try {
    let res;
    if (category) {
      res = await axios.get(`/post/${category}`);
    } else {
      res = await axios.get('/post');
    }
    dispatch({
      type: GET.GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/post/${id}`);
    dispatch({
      type: GET.GET_POST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addLike = (id, needtoreload = false) => async dispatch => {
  try {
    const res = await axios.put(`/post/like/${id}`);

    dispatch({
      type: GET.UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
    if (needtoreload) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const removeLike = (id, needtoreload) => async dispatch => {
  try {
    const res = await axios.put(`/post/unlike/${id}`);

    dispatch({
      type: GET.UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
    if (needtoreload) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//PROFILE

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/profile/me');
    dispatch({
      type: GET.GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addSomething = (url, formData, history) => async dispatch => {
  try {
    const res = await axios.put(`/profile/${url}`, formData, setHeaderConfig);
    dispatch({
      type: GET.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(`${url} Added`, 'success'));

    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const deleteSomething = (url, id) => async dispatch => {
  try {
    const res = await axios.delete(`/profile/${url}/${id}`);

    dispatch({
      type: GET.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(`${url} Removed`, 'success'));
    window.location.reload();
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post('/profile', formData, setHeaderConfig);

    dispatch({
      type: GET.GET_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert(
        edit ? 'Profile Updated Successfuly' : 'Profile Created',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getProfiles = () => async dispatch => {
  dispatch({ type: GET.CLEAR_PROFILE });

  try {
    const res = await axios.get('/profile');
    dispatch({
      type: GET.GET_PROFILES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/profile/user/${userId}`);

    dispatch({
      type: GET.GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getGithubRepos = userName => async dispatch => {
  try {
    const res = await axios.get(`/profile/github/${userName}`);
    console.log(res.data);
    dispatch({
      type: GET.GET_REPOS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await axios.post(
      `/post/comment/${postId}`,
      formData,
      setHeaderConfig
    );

    dispatch({
      type: GET.ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('留言成功', 'success'));

    window.location.reload();
  } catch (err) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addCer = (
  profileId,
  skillId,
  needtoreload = false
) => async dispatch => {
  try {
    const res = await axios.put(`/profile/${profileId}/skills/${skillId}`);

    dispatch({
      type: GET.CER_SKILL,
      payload: { profileId, skillId, cer: res.data }
    });
    if (needtoreload) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const removeCer = (
  profileId,
  skillId,
  needtoreload = false
) => async dispatch => {
  try {
    const res = await axios.delete(`/profile/${profileId}/skills/${skillId}`);

    dispatch({
      type: GET.CER_SKILL,
      payload: { profileId, skillId, cer: res.data }
    });
    if (needtoreload) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: GET.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// // Delete comment
// export const deleteComment = (postId, commentId) => async dispatch => {
//   try {
//     await axios.delete(`/post/comment/${postId}/${commentId}`);

//     dispatch({
//       type: GET.REMOVE_COMMENT,
//       payload: commentId
//     });

//     dispatch(setAlert('成功刪除留言', 'success'));
//   } catch (err) {
//     dispatch({
//       type: GET.POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

export const friendRequest = receiverId => async dispatch => {
  try {
    const res = await axios.put(`/profile/${receiverId}/friendrequest`);

    dispatch({
      type: GET.GET_PENDING,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.FRIEND_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getFriends = profileownerId => async dispatch => {
  try {
    const res = await axios.get(`/auth/friends/${profileownerId}`);

    dispatch({
      type: GET.GET_FRIEND,
      payload: res.data
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: GET.FRIEND_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getPendingFriends = profileownerId => async dispatch => {
  try {
    const res = await axios.get(`/auth/pending/${profileownerId}`);

    dispatch({
      type: GET.GET_PENDING,
      payload: res.data
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: GET.FRIEND_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const acceptOrRejectFriend = (id, status) => async dispatch => {
  try {
    let res;
    if (status === 'accept') {
      res = await axios.put(`/auth/pending/${status}/${id}`);
    }
    if (status === 'reject') {
      res = await axios.delete(`/auth/pending/${status}/${id}`);
    }
    console.log(res.data);

    dispatch({
      type: GET.GET_PENDING,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET.FRIEND_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getMsg = chater => async dispatch => {
  try {
    const res = await axios.get(`/message/${chater}`);
    console.log(res.data);
    dispatch({ type: GET.GET_MSG, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const postMsg = (formData, receiver) => async dispatch => {
  await axios.post(`/message/${receiver}`, formData, setHeaderConfig);
};
