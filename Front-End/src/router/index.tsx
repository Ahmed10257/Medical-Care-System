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
    </>
  )
);

export default router;
