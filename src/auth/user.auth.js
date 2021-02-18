import axios from 'axios';

export const registerUser = ({ name, email, password }) => {
  console.log({ name, email, password });
  return axios
    .post('https://micro-authentication.herokuapp.com/auth/register', { name, email, password })
    .then((response) => response.data)
    .then((user) => user);
};

export const loginUser = ({ email, password }) => {
  return axios
    .post('https://micro-authentication.herokuapp.com/auth/login', { email, password })
    .then((response) => response.data)
    .then((data) => data);
};

export const isLoggedIn = () => {
  const token = sessionStorage.getItem('token');

  if (token) {
    return true;
  }
  return false;
};

export const getUserData = () => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return Promise.resolve(false);
  }

  return axios
    .get(`https://micro-authentication.herokuapp.com/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
