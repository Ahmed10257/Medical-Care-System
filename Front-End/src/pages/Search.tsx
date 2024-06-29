import { useContext, useEffect, useState } from "react";
import Card from "../components/DoctorCard";
import { DoctorWithAppointments } from "../interfaces";
import { useSearch } from "../contexts/SearchContext";
import { SearchContext } from "../contexts/SearchContext";

const Search = () => {
  const [doctorsWithAppointments, setDoctorsWithAppointments] = useState<
    DoctorWithAppointments[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;
  const { searchResults } = useSearch();

  useContext(SearchContext);

  useEffect(() => {
    setDoctorsWithAppointments(searchResults);
  }, [searchResults]);
  console.log(doctorsWithAppointments);
  console.log(searchResults);
  // console.log(doctorsWithAppointments.length);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorsWithAppointments.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  console.log("Current Doctors:", JSON.stringify(currentDoctors, null, 2));

  const totalPages = Math.ceil(doctorsWithAppointments.length / doctorsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 h-20 bg-black"></div>

        <div className="col-span-3 h-80 sticky top-10 bg-black">
          {/* Sidebar content */}
        </div>

        <div className="col-span-9">
          <div className="grid grid-cols-1 gap-4">
            {currentDoctors.map(({ doctor, appointments }) => {
              // Log each doctor object
              console.log(doctor);
              console.log(currentDoctors);

              return (
                <Card
                  key={doctor._id}
                  id={doctor._id}
                  imageUrl={doctor.image}
                  name={doctor.name}
                  title={doctor.specialization}
                  rating={doctor.rating}
                  ratingsCount={doctor.numberOfVisitors}
                  specialization={doctor.specialization}
                  location={`${doctor.clinic.street}, ${doctor.clinic.building}`}
                  fees={doctor.fees}
                  waitingTime={`${doctor.waitingTime} Minutes`}
                  phoneNumber={doctor.contactInfo}
                  appointments={appointments}
                />
              );
            })}
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              className={`btn ${
                currentPage === 1 ? "hidden" : "block"
              } bg-blue-500 text-white px-4 py-2 rounded-full mr-2`}
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <div className="flex">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`btn ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } mx-1 px-4 py-2 rounded-full`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className={`btn ${
                currentPage === totalPages ? "hidden" : "block"
              } bg-blue-500 text-white px-4 py-2 rounded-full ml-2`}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
