import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';

//App.js uygulamayi calistirinca ya da refresh edince calisiyor.

const theme = createMuiTheme(themeFile);

let authenticated;

//localStorage, refresh etsem de korunuyor.
const token = localStorage.FBIdToken;

console.log('lanet token', token);

if (token) {
  const decodedToken = jwtDecode(token);
  console.log('decodedToken', decodedToken);
  if (decodedToken.exp * 1001 < Date.now()) {
    window.location.href = '/login'; //package.json'da yer alan proxy ekleniyor tum linklerin basina.
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute
                  exact
                  path='/login'
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path='/signup'
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
