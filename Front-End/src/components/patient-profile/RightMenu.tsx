import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RightMenu = () => {
  return (
    <div className="w-full bg-gray-100 rounded-t-lg rounded-b-lg">
      <div className="bg-white rounded-t-lg lg:w-72 md:w-60">
        <NavLink
          to="/patient-profile/myprofile"
          className={({ isActive }) =>
            `w-full border flex items-center p-2 rounded-t-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`
          }
        >
          <i className="fas fa-info-circle mr-2"></i>
          My Profile
        </NavLink>
        <NavLink
          to="/patient-profile/changePassword"
          className={({ isActive }) =>
            `w-full border flex items-center p-2 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`
          }
        >
          <i className="fas fa-users mr-2"></i>
          Change Password
        </NavLink>
        <NavLink
          to="/patient-profile/appointments"
          className={({ isActive }) =>
            `w-full border flex items-center p-2 rounded-b-md ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`
          }
        >
          <i className="fas fa-shield-alt mr-2"></i>
          Appointments
        </NavLink>
      </div>
    </div>
  );
};

export default RightMenu;
