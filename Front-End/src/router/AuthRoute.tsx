import { Navigate, Outlet } from 'react-router-dom';
import { isAuth } from '../utils/functions';

const AuthRoute = () => {
  return !isAuth() ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoute;
