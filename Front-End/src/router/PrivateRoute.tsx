import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getRole, isAuth } from "../utils/functions";
import DoctorLogin from "../pages/doctor-registeration/DoctorLogin";

const PrivateRoute = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const paths = [
    "/doctor",
    "/doctor/login",
    "/doctor/register",
    "/doctor/doctor-forget-password",
    "/doctor/doctor-reset-password",
  ];

  console.log("Current Path:", currentPath);

  if (isAuth()) {
    if (getRole() === "doctor") {
      if (!paths.includes(currentPath)) return <Outlet />
        else return <Navigate to="/dashboard" />
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (paths.includes(currentPath)) {
      return <Outlet />;
    } else {
      return <DoctorLogin />;
    }
  }
};

export default PrivateRoute;
