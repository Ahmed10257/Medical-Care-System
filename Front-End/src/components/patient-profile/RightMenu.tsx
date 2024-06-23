import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RightMenu = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="w-full bg-gray-100 rounded-t-lg rounded-b-lg ">
      <div className="bg-white rounded-t-lg lg:w-72 md:w-60">
        <button
          onClick={() => {
            window.location.href = "/pationt-profile";
            setSelectedOption("myprofile");
          }}
          className={`w-full border flex items-center p-2 rounded-t-lg ${
            selectedOption === "myprofile"
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          <i className=" fas fa-info-circle mr-2"></i>
          My Profile
        </button>
        <button
          onClick={() => setSelectedOption("changePassword")}
          className={`w-full border flex items-center p-2 ${
            selectedOption === "changePassword"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-users mr-2"></i>
          Change Password
        </button>
        <button
          onClick={() => setSelectedOption("medicalInsurance")}
          className={`w-full border flex items-center p-2 rounded-b-md ${
            selectedOption === "medicalInsurance"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-shield-alt mr-2"></i> Appointments
        </button>
      </div>
    </div>
  );
};

export default RightMenu;
