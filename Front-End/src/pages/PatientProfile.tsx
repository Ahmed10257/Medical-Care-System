import { Outlet } from "react-router-dom";
import RightMenu from "../components/patient-profile/RightMenu";

const PatientProfile = () => {
  return (
    <div className="w-11/12 m-auto lg:mt-0 container lg:flex lg:flex-row lg:gap-3 lg:justify-end lg:-mx-24 md:flex md:flex-row md:mt-20 md:gap-3">
      <div className="md:hidden lg:hidden w-full mb-7">
        <RightMenu />
      </div>
      <div className="lg:w-7/12 md:w-9/12 md:ml-20">
        <Outlet />
      </div>
      <div className="hidden lg:block md:block lg:w-2/12 lg:h-5 md:w-3/12 md:h-full">
        <RightMenu />
      </div>
    </div>
  );
};

export default PatientProfile;
