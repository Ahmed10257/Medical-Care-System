import DropDown from "./DropDown";
import "./style.css";
import { Link } from "react-router-dom";

const NormalNav = () => {
  return (
    <>
      <div
        className="w-full md:block md:w-auto  navbar-right  me-20"
        id="navbar-default"
      >
        <ul className="font-medium text-sm flex flex-col  mt-4 border border-blue-700 rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white md:dark:bg-blue-700 dark:border-bg-blue-700">
       
        <li>
            <div className="flex ">
              <div className="flex  items-">
              <div >
              <Link
                to="signup"
                className="block mx-1 text-gray-900  border border-white p-1  dark:text-white text-xs hover:bg-white hover:text-blue-500 hover:font-semibold"
              >
                Sign Up
              </Link>
              </div>
              <div>

            <Link
                to="signin"
                className="block mx-1 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:underline"
              >
                Login
              </Link>
              </div>
              </div>
              <span className="sperateline"></span>
            </div>
          </li>

          <li>
            <div className="flex ">
              <DropDown />
              <span className="sperateline"></span>
            </div>
          </li>

          <li>
            <div className="flex">
              <Link
                to="#"
                className="block mx-1 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:underline"
              >
                Vezeeta For Doctors
              </Link>
              <span className="sperateline"></span>
            </div>
          </li>

          <li>
            <div className="flex">
              <Link
                to="contact"
                className="block mx-1 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:underline"
              >
                Contact Us
              </Link>
              <span className="sperateline"></span>
            </div>
          </li>
          <li>
            <Link
              to="#"
              className="block text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:underline"
            >
              English
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NormalNav;
