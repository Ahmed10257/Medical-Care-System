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
import Search from "../pages/Search";
import Book from "../pages/Booking";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <div>
            <Layout />
          </div>
        }
        errorElement={<ErrorHandler message="Page not found" />}
      >
        <Route
          index
          element={<Home />}
          errorElement={
            <ErrorHandler statusCode={504} message={"Server Error"} />
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
          path="/search"
          element={<Search />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/book/:doctor_id/:appointment_id"
          element={<Book />}
          errorElement={<ErrorHandler />}
        />

        <Route path="*" element={<ErrorHandler statusCode={404} message="Page not found" />} />
      </Route>
    </>
  )
);

export default router;
