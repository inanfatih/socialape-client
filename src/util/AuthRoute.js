import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);
//burada suslu parantez yerine bu parantezi () kullandigimda return kullanmaya gerek yok. It straight away returns something

export default AuthRoute;
