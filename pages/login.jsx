import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import cookie from 'js-cookie';
import Router from 'next/router';
import {useEffect, useState} from 'react';
import jwt from 'jsonwebtoken';

/**
 * @function index
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Login Page
 * @returns {Container<any>} - React Body
 */
export default function index() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <Container fluid="xl">
      {error ? (
        <Alert variant="danger" onClose={() => setError(false)} dismissible>
          <p>{message}</p>
        </Alert>
      ) : undefined}
      {success ? (
        <Alert variant="primary" onClose={() => setSuccess(false)} dismissible>
          <p>{message}</p>
        </Alert>
      ) : undefined}
      <Form
        onSubmit={e => {
          e.preventDefault();
          fetch('/api/login', {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
            method: 'POST',
          })
            .then(x => x.json())
            .then(x => {
              if (x && x.error) {
                setMessage(x.error);
                setError(true);
              } else if (x && x.token) {
                setMessage('Logged in, Redirecting...');
                setSuccess(true);
                cookie.set('token', x.token, {
                  expires: 2,
                });
                Router.push('/');
              }
            });
        }}
      >
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button
          variant="primary"
          onClick={() => useEffect(() => Router.push('/signup'))}
        >
          Signup
        </Button>
      </Form>
    </Container>
  );
}

/**
 * @async
 * @function getServerSideProps
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Server Side Props Handler
 * @param {import('next').GetServerSidePropsContext} context - Incoming request context
 * @returns {import('next').GetServerSidePropsResult} - Server props
 */
export async function getServerSideProps(context) {
  if ('token' in context.req.cookies) {
    let decoded;
    const token = context.req.cookies.token;
    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        console.error(e);
      }
    }
    if (decoded) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {
        questions: [],
      },
    };
  }
}
