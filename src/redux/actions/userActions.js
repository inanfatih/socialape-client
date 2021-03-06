import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI }); // Bu sekilde action gonderilmis oluyor. Buradaki type, reducer'da yakalanip kullanilacak

  axios
    .post('/login', userData) //package.json'da proxy tanimlandigindan dolayi /login'in basina default olarak proxy adresi geliyor
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //state i degistirdikten sonra bu path e gitmeyi sagliyoruz
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI }); // Bu sekilde action gonderilmis oluyor. Buradaki type, reducer'da yakalanip kullanilacak

  axios
    .post('/signup', newUserData) //package.json'da proxy tanimlandigindan dolayi /login'in basina default olarak proxy adresi geliyor
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //state i degistirdikten sonra bu path e gitmeyi sagliyoruz
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data, // Payload, reducer'a gonderilen data.
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => dispatch(getUserData()))
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post(`/notifications`, notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = FBIdToken; // Bu satir sayesinde axios ile her request gonderildiginde (unprotected route'lar da dahil), default olarak her request te 'Authorization' header'inda token'imiz gonderilecek.
};
