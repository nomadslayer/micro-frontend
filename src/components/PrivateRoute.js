import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../auth/user.auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      return isLoggedIn()
        ? <Component {...props} />
        : <Redirect to="/login" />;
    }} />
  );
};

export default PrivateRoute;
