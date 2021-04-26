import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Profile from './pages/Profile';
import Chat from './pages/Chat.js';
import {Container} from 'semantic-ui-react';
import {AuthProvider} from './context/auth.js';
import AuthRoute from './utils/AuthRoute.js';
import './App.css';

const App = () =>  {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route  exact path='/register' component={Register} />
            <AuthRoute exact path='/' component={Home} />
            <AuthRoute  exact path='/profile' component={Profile} />
            <AuthRoute  exact path='/chat' component={Chat} />
          </Switch>
        </Container>  
      </Router>
    </AuthProvider>  
  );
}

export default App;
