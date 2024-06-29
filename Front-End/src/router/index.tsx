import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorHandler from "../errors/ErrorHandler";
import TestFilter from "../pages/TestFilter";
import ForgetPassword from "../pages/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "../pages/ResetPassword";
import DoctorLayout from "../pages/doctor-registeration/DoctorLayout";
import DoctorLogin from "../pages/doctor-registeration/DoctorLogin";
import DoctorRegister from "../pages/doctor-registeration/DoctorRegister";
import DoctorForgetPassword from "../pages/doctor-registeration/DoctorForgetPassword";
import DoctorResetPassword from "../pages/doctor-registeration/DoctorResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Layout />}
        errorElement={<ErrorHandler message="Page not found" />}
      >
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/filter" element={<TestFilter />} />
        </Route>

        <Route
          path="*"
          element={<ErrorHandler statusCode={404} message="Page not found" />}
        />
      </Route>
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route element={<DoctorLogin />} index />
        <Route element={<DoctorLogin />} path="login" />
        <Route element={<DoctorRegister />} path="register" />
        <Route element={<DoctorForgetPassword />} path="doctor-forget-password" />
        <Route element={<DoctorResetPassword />} path="doctor-reset-password" />
      </Route>
    </>
  )
);

export default router;
