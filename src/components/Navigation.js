import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { isLoggedIn } from '../auth/user.auth';

const Navigation = ({ history }) => {
  const logout = () => {
    const token = sessionStorage.getItem('token');
    if (token) sessionStorage.removeItem('token');

    history.push('/login');
  };

  if (isLoggedIn()) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/login">
              <Nav.Link as="span">Login</Nav.Link>
            </Link>
            <Link to="/register">
              <Nav.Link as="span">Register</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default withRouter(Navigation);
