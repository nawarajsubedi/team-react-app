import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Col, Button, Form, FormControl, InputGroup, FormLabel, Spinner } from 'react-bootstrap';

import StatusAlert from '../components/StatusAlert';
import { emailPattern } from '../common/constants';
import useAuth from '../hooks/useAuth';

import './signup.css';
import { User } from '../common/types/user';

interface SignupFormValues extends Omit<User, 'id'> {
  agree: boolean;
}

function Signup() {
  const title = 'Signup';

  const [isLoading, setIsLoading] = useState(false);
  const { addUser } = useAuth();
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<SignupFormValues>();

  const alertOpts = useRef<{ isShow: boolean; message: string }>({ isShow: false, message: '' });

  const handleDismiss = () => {
    alertOpts.current.isShow = false;
  };

  const handleSignup: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const user = await addUser(data);
      console.log(`signup successful, user: ${user}`);
      setIsLoading(false);
      navigate('/login');
    } catch (err: any) {
      alertOpts.current = { isShow: true, message: err.message };
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-signup">
        <Form className="row g-3" noValidate>
          <i className="bi bi-file-lock-fill auth-icon mt-3 text-center" />
          <p className="fw-normal text-center">Fill out the form to create a new account.</p>
          <Form.Group as={Col} lg="12" controlId="inputEmail">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              isInvalid={!!errors.email}
              placeholder="Email@domain.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailPattern,
                  message: 'Invalid email',
                },
              })}
              aria-label="Email"
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg="12" controlId="inputUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                isInvalid={!!errors.username}
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                {...register('username', { required: 'Username is required' })}
              />
              <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} lg="12" controlId="inputPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              isInvalid={!!errors.password}
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Password must be at least 5 characters long',
                },
              })}
              aria-label="Password"
            />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Check
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              isInvalid={!!errors.agree}
              {...register('agree', { required: 'You must agree to the terms' })}
              aria-label="Agree to terms and conditions"
            />
          </Form.Group>
          <Button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit(handleSignup)}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">Sign up</span>
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

export default Signup;