import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import "./style.css";
import { Link } from "react-router-dom";
import { getAuthPatient, isAuth } from "../../utils/functions";
import {configAxios as axios} from "../../config/api";
import { IPatient } from "../../interfaces/DoctorData";

const NormalNav = () => {
  const [pId, setPId] = useState<string>("");
  const [dataPatinet, setDataPatinet] = useState<IPatient | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const id = await getAuthPatient();
      setPId(id);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!pId) return;
      try {
        const response = await axios.get(`http://127.0.0.1:3000/patient/${pId}`);
        setDataPatinet(response.data);
      } catch (err) {
        setError("Error fetching Patient data");
      }
    };

    fetchPatientData();
  }, [pId]);

  return (
    <>
      <div
        className="w-full md:block md:w-auto navbar-right me-20"
        id="navbar-default"
      >
        <ul className="font-medium text-sm flex flex-col mt-4 border border-blue-700 rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white md:dark:bg-blue-700 dark:border-bg-blue-700">
          {!isAuth() && (
            <li>
              <div className="flex">
                <div className="flex items-center">
                  <div>
                    <Link
                      to="signup"
                      className="block mx-1 text-gray-900 border border-white p-1 dark:text-white text-xs hover:bg-white hover:text-blue-500 hover:font-semibold"
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
          )}

          {isAuth() && dataPatinet && (
            <li>
              <div className="flex">
                <DropDown patinetData={dataPatinet} />
                <span className="sperateline"></span>
              </div>
            </li>
          )}
          <li>
            <div className="flex">
              <Link
                to="doctor"
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
