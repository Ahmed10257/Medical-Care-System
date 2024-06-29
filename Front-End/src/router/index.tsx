import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DoctorDashboard from "../pages/DoctorDashboard";
import Schedule from "../components/doctor-dashboard/Schedule";
import Entity from "../components/doctor-dashboard/Entity";
import Patients from "../components/doctor-dashboard/Patients";
import ErrorHandler from "../errors/ErrorHandler";
import Consultation from "../components/doctor-dashboard/Consultation";
import Confirmation from "../components/doctor-dashboard/Confirmation";
import PatientProfile from "../pages/PatientProfile";
import UpdateForm from "../components/patient-profile/UpdateForm";
import ChangePassword from "../components/patient-profile/ChangePassword";
import Appointments from "../components/patient-profile/Appointments";
import ContactDashboard from "../pages/ContactDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Layout />}
        errorElement={<ErrorHandler message="Page not found" />}
      >
        <Route
          index
          element={<Home />}
          errorElement={
            <ErrorHandler statusCode={504} message="Server Error" />
          }
        />
        <Route
          path="/about"
          element={<AboutUs />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/contact"
          element={<ContactUs />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/signin"
          element={<Login />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/signup"
          element={<Register />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="contact-dashboard"
          element={<ContactDashboard />}
          errorElement={<ErrorHandler />}
        />

        <Route
          path="/patient-profile"
          element={<PatientProfile />}
          errorElement={<ErrorHandler />}
        >
          <Route index element={<Navigate to="myprofile" />} />
          <Route
            path="myprofile"
            element={<UpdateForm />}
            errorElement={<ErrorHandler />}
          />
          <Route
            path="changePassword"
            element={<ChangePassword />}
            errorElement={<ErrorHandler />}
          />
          <Route
            path="appointments"
            element={<Appointments />}
            errorElement={<ErrorHandler />}
          />
        </Route>
      </Route>

      {/* Doctor routes using the DoctorDashboard layout */}
      <Route
        path="/dashboard"
        element={<DoctorDashboard />}
        errorElement={<ErrorHandler message="Page not found" />}
      >
        {/* Redirect from /dashboard to /dashboard/schedule */}
        <Route index element={<Navigate to="schedule" />} />
        <Route
          path="consultations"
          element={<Consultation />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="patients"
          element={<Patients />}
          errorElement={<ErrorHandler />}
        />

        <Route
          path="entity"
          element={<Entity />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="schedule"
          element={<Schedule />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="confirmation"
          element={<Confirmation />}
          errorElement={<ErrorHandler />}
        />
      </Route>

      <Route
        path="*"
        element={<ErrorHandler statusCode={404} message="Page not found" />}
      />
    </>
  )
);

export default router;
