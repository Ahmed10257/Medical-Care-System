import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import DropDown from "./Dropdown";
import axios from "axios";
import { useSearch } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
// import { DoctorWithAppointments } from "../../interfaces/index";

interface IProps {}

const Specialities = [
  { name: "Cardiology" },
  { name: "Dermatology" },
  { name: "Endocrinology" },
  { name: "Gastroenterology" },
  { name: "Hematology" },
  { name: "Infectious Diseases" },
  { name: "Nephrology" },
  { name: "Neurology" },
  { name: "Oncology" },
  { name: "Pediatrics" },
  { name: "Pulmonology" },
  { name: "Rheumatology" },
  { name: "Urology" },
];

const Cities = [
  { name: "Cairo" },
  { name: "Giza" },
  { name: "Alexandria" },
  { name: "Luxor" },
  { name: "Aswan" },
  { name: "Hurghada" },
  { name: "Sharm El Sheikh" },
  { name: "Dahab" },
  { name: "Taba" },
  { name: "Marsa Alam" },
  { name: "Suez" },
  { name: "Ismailia" },
  { name: "Port Said" },
  { name: "El Arish" },
  { name: "Fayoum" },
  { name: "Mansoura" },
  { name: "Tanta" },
  { name: "Zagazig" },
  { name: "Damietta" },
  { name: "Kafr El Sheikh" },
  { name: "Banha" },
  { name: "Mallawi" },
  { name: "Beni Suef" },
  { name: "El Minya" },
];

const SearchBar = ({}: IProps) => {
  const [speciality, setSpeciality] = useState<string | null>("");
  const [city, setCity] = useState("");
  const [doctorOrHospital, setDoctorOrHospital] = useState("");
  const navigate = useNavigate();
  const { setSearchResults } = useSearch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { speciality, city, doctorOrHospital };
    try {
      const response = await axios.get("http://127.0.0.1:3000/doctor/search", {
        params: payload,
      });
      setSearchResults(response.data);
      console.log(response.data);
      // console.log(setSearchResults);
      console.log(payload);

      navigate("/search");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center lg:items-start ">
      <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-auto md:space-x-8">
        <div className="flex items-center space-x-2 mb-4 md:mb-0 ">
          <div className="flex items-center my-3">
            <span className="text-blue-600 m-3">
              <CalendarPlus size={36} />
            </span>
            <div className="flex flex-col">
              <div className="font-semibold text-2xl text-blue-500 text-start">
                Book a doctor
              </div>
              <div className="text-blue-500 text-start">
                Examination or procedure
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        className="flex flex-col md:flex-row w-full lg:w-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col lg:flex-row items-center  mt-4 md:mt-0 w-full lg:w-auto">
          <div className="flex items-center border rounded-xl px-2 py-1 space-x-2 h-12 w-full my-2">
            <i className="fas fa-stethoscope text-blue-600"></i>
            <DropDown
              placeholder="Choose Speciality"
              options={Specialities}
              onChange={(e) => setSpeciality(e?.name)}
            />
          </div>
          <div className="flex items-center border rounded-xl px-2 py-1 space-x-2 h-12 w-full my-2 mx-2">
            <i className="fas fa-map-marker-alt text-blue-600"></i>
            <DropDown
              placeholder="Choose City"
              options={Cities}
              onChange={(e) => {
                setCity(e.name);
              }}
            />
          </div>
          {/* <div className="flex items-center border rounded-xl px-2 py-1 space-x-2 h-12 w-full my-2">
            <i className="fas fa-map-marker-alt text-blue-600"></i>
            <DropDown placeholder="Choose Area" />
          </div> */}
          <div className="flex items-center border rounded-xl px-2 py-1 space-x-2 h-12 w-full my-2 ">
            <i className="fas fa-user-md text-blue-600"></i>
            <input
              type="text"
              placeholder="Doctor name or hospital"
              className="outline-none w-full"
              onChange={(e) => setDoctorOrHospital(e.target.value)}
            />
          </div>
          <button
            className="bg-red-600 text-white rounded-xl px-4 py-2 mt-4 md:mt-0 md:ml-2 w-full lg:w-auto h-12 flex items-center justify-center"
            type="submit"
          >
            <i className="fas fa-search mx-1"></i> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
