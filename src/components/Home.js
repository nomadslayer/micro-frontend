import { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Autocom from './Autocom'  
import { getUserData } from '../auth/user.auth';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData()
      .then((userData) => setUser(userData));
  }, []);

  return (
    <Jumbotron>
      <Container>
        <h2>{user && user.name}, you are logged in!</h2>
        <div>
          <Autocom />
        </div>
      </Container>
    </Jumbotron>
  );
};

export default Home;
