import { Navigate, Outlet } from 'react-router-dom';
import { isAuth } from '../utils/functions';

const PrivateRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
