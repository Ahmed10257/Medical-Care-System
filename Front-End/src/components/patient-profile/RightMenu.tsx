import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RightMenu = ({
  setSelectedOption,
}: {
  setSelectedOption: (option: string) => void;
}) => {
  const [selectedOption, setSelectedOptionState] = useState("");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setSelectedOptionState(option);
  };

  return (
    <div className="w-full bg-gray-100 rounded-t-lg rounded-b-lg ">
      <div className="bg-white rounded-t-lg lg:w-72 md:w-60">
        <button
          onClick={() => handleOptionClick("myprofile")}
          className={`w-full border flex items-center p-2 rounded-t-lg ${
            selectedOption === "myprofile"
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-info-circle mr-2"></i>
          My Profile
        </button>
        <button
          onClick={() => handleOptionClick("changePassword")}
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
          onClick={() => handleOptionClick("appointments")}
          className={`w-full border flex items-center p-2 rounded-b-md ${
            selectedOption === "appointments"
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
