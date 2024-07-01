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
import Search from "../pages/Search";
import Book from "../pages/Booking";
import BookingConfirmation from "../pages/BookingConfirmation";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import DoctorLayout from "../pages/doctor-registeration/DoctorLayout";
import DoctorLogin from "../pages/doctor-registeration/DoctorLogin";
import DoctorRegister from "../pages/doctor-registeration/DoctorRegister";
import DoctorForgetPassword from "../pages/doctor-registeration/DoctorForgetPassword";
import DoctorResetPassword from "../pages/doctor-registeration/DoctorResetPassword";
import DoctorProfile from "../pages/DoctorProfile";
import UpdateForm from "../components/patient-profile/UpdateForm";
import ChangePassword from "../components/patient-profile/ChangePassword";
import Appointments from "../components/patient-profile/Appointments";
import ContactDashboard from "../pages/ContactDashboard";
import AuthRoute from "./AuthRoute";
import PatientRoute from "./PatientRoute";
import DoctorRoute from "./DoctorRoute";
import PrivateRoute from "./PrivateRoute";
import Filtering from "../pages/TestFilter";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Layout />}
        errorElement={<ErrorHandler message="Page not found" />}
      >
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route element={<AuthRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path="/filter"
          element={<Filtering />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/search"
          element={<Search />}
          errorElement={<ErrorHandler />}
        />
        <Route element={<PatientRoute />}>
          <Route
            path="/book/:doctor_id/:appointment_id"
            element={<Book />}
            errorElement={<ErrorHandler />}
          />
          <Route
            path="/confirmation/:id/:doctor_id"
            element={<BookingConfirmation />}
            errorElement={<ErrorHandler />}
          />
          <Route
            path="/doctor/:id"
            element={<DoctorProfile />}
            errorElement={<ErrorHandler />}
          />
          <Route
            path="contact-dashboard"
            element={<ContactDashboard />}
            errorElement={<ErrorHandler />}
          />
        </Route>
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

      {/* Doctor routes using the DoctorLayout */}
      <Route element={<PrivateRoute />}>
        <Route element={<DoctorRoute />}>
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
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route element={<DoctorLogin />} index />
          <Route element={<DoctorLogin />} path="login" />
          <Route element={<DoctorRegister />} path="register" />
          <Route
            element={<DoctorForgetPassword />}
            path="doctor-forget-password"
          />
          <Route
            element={<DoctorResetPassword />}
            path="doctor-reset-password"
          />
        </Route>
      </Route>
      <Route
        path="*"
        element={<ErrorHandler statusCode={404} message="Page not found" />}
      />
    </>
  )
);

export default router;
