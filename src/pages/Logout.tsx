import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';

import useAuth from '../hooks/useAuth';

import './auth.css';

const Logout: React.FC = () => {
  const title = 'Logout';
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Form noValidate>
          <i className="bi bi-file-lock-fill auth-icon my-4" />
          <p className="mb-3 fw-normal">
            Click <strong>Log out</strong> button to log out and navigate back to home.
          </p>
          <Button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            disabled={isLoading}
            onClick={handleLogout}
          >
            {isLoading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}
            <span className="px-2">{isLoading ? 'Logging out...' : 'Log out'}</span>
          </Button>
        </Form>
      </main>
    </>
  );
}

export default Logout;