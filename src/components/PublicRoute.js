import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../auth/user.auth';

const PublicRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      return isLoggedIn()
        ? <Redirect to="/" />
        : <Component {...props} />;
    }} />
  );
};

export default PublicRoute;
