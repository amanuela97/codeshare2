import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth.js';
import { useForm } from '../hooks/useForm.js';
import {REGISTER_USER} from '../utils/graphql.js'

function Register(props) {
  const context = useContext(AuthContext);
  const [errorKey, setErrorKey] = useState({value: ''});
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
        if(err.graphQLErrors[0].extensions[0]) {
          setErrorKey({value: err.graphQLErrors[0].extensions[0].context.key});
          setError(err.graphQLErrors[0].extensions[0].message);
        }else{
          setError(err.graphQLErrors[0].message);
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
          error={errorKey.value === "username" ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errorKey.value === "email" ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errorKey.value === "password" ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errorKey.value === "confirmPassword" ? true : false}
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