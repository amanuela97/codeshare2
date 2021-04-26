import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import {LOGIN_USER} from '../utils/graphql.js'
import { AuthContext } from '../context/auth.js';
import { useForm } from '../hooks/useForm.js';

const  Login = (props) => {
  const context = useContext(AuthContext);
  const [error, setError] = useState();

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      try {
        if(err.graphQLErrors[0].extensions[0]) {
          setError(err.graphQLErrors[0].extensions[0].message);
        } else {
          setError(err.graphQLErrors[0].message);
        }
      } catch (error) {
        console.log(error);
      }  
    },
    variables: values
  });

  

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form  onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className="form-h1">Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}

          onChange={onChange}
        />
        <Button type="submit" primary disabled={loading}>
          Login
        </Button>
        <p>Don't have an account ?
          <a href="./register">  Register</a>
        </p>
      </Form>
      { error && (
      <p className="ui error message">{error}</p>)}
    </div>
  );
}


export default Login;