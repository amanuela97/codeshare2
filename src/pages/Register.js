import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth.js';
import { useForm } from '../hooks/useForm.js';
import {REGISTER_USER} from '../utils/graphql.js'

function Register(props) {
  const context = useContext(AuthContext);
  const [error, setError] = useState();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { registerUser: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      try {
        if(err) {
          const errors = err.graphQLErrors.map(error => error.message);
          setError(errors)
          console.log(errors);
        } 
    } catch (error) {
          console.log(error);
    } 
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1 className="form-h1">Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
        <p>Already have an account ?
          <a href="./login">  Login</a>
        </p>
      </Form>
      { error && (
      <p className="ui error message">{error}</p>)}
    </div>
  );
}



export default Register;