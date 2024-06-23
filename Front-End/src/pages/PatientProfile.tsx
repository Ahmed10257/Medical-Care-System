import RightMenu from "../components/patient-profile/RightMenu";
import UpdateForm from "../components/patient-profile/UpdateForm";

const PatientProfile = () => {
  return (
    <div className="w-11/12 m-auto mt-20 container lg:flex lg:flex-row lg:mt-20 lg:gap-3 lg:justify-end lg:-mx-28 md:flex md:flex-row md:mt-20 md:gap-3">
      <div className="md:hidden lg:hidden w-full mt-8 mb-7">
        <RightMenu />
      </div>
      <div className="lg:w-6/12 md:w-9/12 md:ml-20">
        <UpdateForm />
      </div>
      <div className="hidden lg:block md:block lg:w-2/12 lg:h-5 md:w-3/12 md:h-full">
        <RightMenu />
      </div>
    </div>
  );
};

export default PatientProfile;
