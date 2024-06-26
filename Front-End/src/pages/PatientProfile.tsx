import { useState } from "react";
import RightMenu from "../components/patient-profile/RightMenu";
import UpdateForm from "../components/patient-profile/UpdateForm";
import ChangePassword from "../components/patient-profile/ChangePassword";
import Appointments from "../components/patient-profile/Appointments";

const PatientProfile = () => {
  const [selectedOption, setSelectedOption] = useState("myprofile");

  return (
    <div className="w-11/12 m-auto lg:mt-0  container lg:flex lg:flex-row  lg:gap-3 lg:justify-end lg:-mx-24 md:flex md:flex-row md:mt-20 md:gap-3">
      <div className="md:hidden lg:hidden w-full  mb-7">
        <RightMenu setSelectedOption={setSelectedOption} />
      </div>
      <div className="lg:w-7/12 md:w-9/12 md:ml-20">
        {selectedOption === "myprofile" && <UpdateForm />}
        {selectedOption === "changePassword" && <ChangePassword />}
        {selectedOption === "appointments" && <Appointments />}
      </div>

      <div className="hidden lg:block md:block lg:w-2/12 lg:h-5 md:w-3/12 md:h-full">
        <RightMenu setSelectedOption={setSelectedOption} />
      </div>
    </div>
  );
};

export default PatientProfile;
