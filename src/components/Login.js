import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../auth/user.auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveTokenInSession = (token) => {
    sessionStorage.setItem('token', token);
  };

  const onLogin = (event) => {
    event.preventDefault();

    loginUser({ email, password }).then((data) => {
      const { success, user, token } = data;
      if (success === 'true' && user.id) {
        saveTokenInSession(token);
        history.push('/');
      }
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Log In</h2>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button onClick={onLogin} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(Login);
