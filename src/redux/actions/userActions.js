import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI }); // Bu sekilde action gonderilmis oluyor. Buradaki type, reducer'da yakalanip kullanilacak
  
  axios
    .post('/login', userData) //package.json'da proxy tanimlandigindan dolayi /login'in basina default olarak proxy adresi geliyor
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
      axios.defaults.headers.common['Authorization'] = FBIdToken; // Bu satir sayesinde axios ile her request gonderildiginde (unprotected route'lar da dahil), default olarak her request te 'Authorization' header'inda token'imiz gonderilecek.
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //state i degistirdikten sonra bu path e gitmeyi sagliyoruz
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => dispatch => {
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data, // Payload, reducer'a gonderilen data.
      });
    })
    .catch(err => console.log(err));
};
