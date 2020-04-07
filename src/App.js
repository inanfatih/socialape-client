import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import user from './pages/user';
import axios from 'axios';
//App.js uygulamayi calistirinca ya da refresh edince calisiyor.

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  'https://us-central1-social-ape-30feb.cloudfunctions.net/api';

//localStorage, refresh etsem de korunuyor.
const token = localStorage.FBIdToken;

console.log('lanet token', token);

if (token) {
  const decodedToken = jwtDecode(token);
  console.log('decodedToken', decodedToken);
  if (decodedToken.exp * 1001 < Date.now()) {
    window.location.href = '/login'; //package.json'da yer alan proxy ekleniyor tum linklerin basina.
    store.dispatch(logoutUser);
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={signup} />
                <Route exact path='/users/:handle' component={user} />
                <Route
                  exact
                  path='/users/:handle/scream/:screamId'
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
