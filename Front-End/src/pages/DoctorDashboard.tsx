import { Link, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/doctor-dashboard/DoctorDashboard.css';
import {getAuthDoctor} from '../utils/functions';

interface DoctorData {

  firstName: string;
  lastName: string;
}

// const [pId, setPId] = useState<string>("");
 
// useEffect(() => {
//     async function fetchData() {
//         const id = await getAuthDoctor();
//         console.log(id);
//         setPId(id);
//     }
//     fetchData();
// }, []);

const DoctorDashboard: React.FC = () => {
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const pId = await getAuthDoctor();
        console.log(pId);
        const response = await axios.get<DoctorData>('http://localhost:3000/doctor/' + pId);
        const doctor = response.data; 
        setDoctorData(doctor); 
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="navbar">
        <div className="navbar-left">
          <h4>Administration</h4>
        </div>
        <div className="navbar-right">
          <div className="user-menu">
            {doctorData && (
              <>
                <span>{doctorData.firstName} {doctorData.lastName}</span>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
                  alt="User"
                  className="user-avatar"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img
              src="../../public/1.png"
              alt="Logo"
              className="logo-image"
            />
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/dashboard/schedule">
                  <img
                    src="https://icon-library.com/images/schedule-icon-transparent/schedule-icon-transparent-1.jpg"
                    alt="Schedule Icon"
                    className="icon-image"
                  />
                  <span>Schedule</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/entity">
                  <img
                    src="https://cdn.onlinewebfonts.com/svg/img_312807.png"
                    alt="Entity Icon"
                    className="icon-image"
                  />
                  <span>Entity</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/patients">
                  <img
                    src="https://getdrawings.com/free-icon-bw/patient-icon-png-12.png"
                    alt="Patients Icon"
                    className="icon-image"
                  />
                  <span>Patients</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/dashboard/consultations">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1478/1478254.png"
                    alt="Consultations Icon"
                    className="icon-image"
                  />
                  <span>Consultations</span>
                </Link>
              </li> */}
              <li>
                <Link to="#">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/000/437/014/original/logout-vector-icon.jpg"
                    alt="Logout Icon"
                    className="icon-image"
                  />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
