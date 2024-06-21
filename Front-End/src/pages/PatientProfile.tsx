import UpdateForm from "../components/patient-profile/UpdateForm";

interface IProps {}
const PatientProfile = (props: IProps) => {
  console.log(props);
  return (
    <>
      <h1>Patient Profile</h1>
      <UpdateForm />
    </>
  );
};

export default PatientProfile;
