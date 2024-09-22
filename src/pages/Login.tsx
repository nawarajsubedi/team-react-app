import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, FormLabel, Spinner } from 'react-bootstrap';

import StatusAlert from '../components/StatusAlert';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';

import './auth.css';

interface LoginFormData {
  username: string;
  password: string;
  isRemember: boolean;
}

const redirectPath = (search: string): string => {
  const match = search.match(/redirect=(.*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : '/console/players';
};

const Login: React.FC = () => {
  const title = 'Login';
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const alertOpts = useRef<{ isShow: boolean; message: string }>({ isShow: false, message: '' });

  const handleDismiss = () => {
    alertOpts.current.isShow = false;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, data: LoginFormData) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await login(data.username, data.password);
      console.log(`Login successful, token: ${token}`);
      navigate(redirectPath(search));
    } catch (err: any) {
      alertOpts.current = { isShow: true, message: err.message };
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validators = {
    username: {
      required: { value: true, message: 'Username is required' },
    },
    password: {
      required: { value: true, message: 'Password is required' },
    },
  };

  const { data, handleChange, handleSubmit, errors } = useForm<LoginFormData>({
    onSubmit: handleLogin,
    validators,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Form noValidate onSubmit={handleSubmit}>
          <i className="bi bi-file-lock-fill auth-icon my-4" />
          <p className="mb-3 fw-normal"><strong>Log in</strong></p>

          <Form.Group className="form-floating" controlId="inputUsername">
            <FormControl
              type="text"
              className="form-control form-input-top"
              isInvalid={!!errors?.username}
              placeholder="Username"
              onChange={handleChange('username')}
            />
            <FormLabel>Username</FormLabel>
          </Form.Group>

          <Form.Group className="form-floating" controlId="inputPassword">
            <FormControl
              type="password"
              className="form-control form-input-bottom"
              isInvalid={!!errors?.password}
              placeholder="Password"
              onChange={handleChange('password')}
            />
            <FormLabel>Password</FormLabel>
          </Form.Group>

          <div className="row mb-3">
            <div className="col-6">
              <Link to="/signup">New account</Link>
            </div>
          </div>

          <Button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}
            <span className="px-2">{isLoading ? 'Logging in...' : 'Log in'}</span>
          </Button>
        </Form>
      </main>
      <StatusAlert
        show={alertOpts.current.isShow}
        variant="failure"
        message={alertOpts.current.message}
        onDismiss={handleDismiss}
      />
    </>
  );
}

export default Login;
