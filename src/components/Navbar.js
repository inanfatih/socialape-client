import React, { Component } from 'react';

import { Link } from 'react-router-dom';

//MUI => Material UI staff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Yukaridaki yerine asagidaki sekilde tum material-ui/core u import edersek, compile zamaninda tum library'i indirmek zorunda kaliriz. Bu da compile time'da hizi dusuruyor.
//import {AppBar, ToolBar} from '@material-ui/core';

class Navbar extends Component {
  render() {
    return (
      <AppBar position='fixed'>
        <Toolbar className='nav-container'>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/signup'>
            Sigup
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
