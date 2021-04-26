import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import NavBar from '../components/nav.js'

const AuthRoute = ({ component: Component, ...rest }) =>  {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? [<NavBar key="1"/> ,<Component {...props} key="2" />] : <Redirect to="/login" />
      }
    />
  );
}

export default AuthRoute;