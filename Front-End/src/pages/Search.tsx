import { useEffect, useState } from "react";
import Card from "../components/DoctorCard";
import { DoctorWithAppointments } from "../interfaces/Booking";
import { useSearch } from "../contexts/SearchContext";
import Filter from "../components/filter-doctors/filter-box/Filter";
import SearchBar from "../components/SearchBar/SearchBar";

const Search = () => {
  const [doctorsWithAppointments, setDoctorsWithAppointments] = useState<DoctorWithAppointments[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;
  const { searchResults } = useSearch();

  useEffect(() => {
    setDoctorsWithAppointments(searchResults);
  }, [searchResults]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorsWithAppointments.slice(indexOfFirstDoctor, indexOfLastDoctor);

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

  const groupAppointmentsByDate = (appointments: Appointment[]) => {
    return appointments.reduce(
      (groups: { [key: string]: Appointment[] }, appointment) => {
        const date = new Date(appointment.date).toDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(appointment);
        return groups;
      },
      {}
    );
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 h-60 w-full">
          <SearchBar />
        </div>
        <div className="col-span-3 h-80 sticky top-10">
          <Filter />
        </div>
        <div className="col-span-9">
          {doctorsWithAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-128 mt-10 bg-gray-50 rounded-lg shadow-lg p-6">
              <h3 className="text-3xl font-bold text-gray-700">No Results Found</h3>
              <img
                className="w-1/4 mt-4"
                src="https://i.pinimg.com/236x/53/a5/9e/53a59edee823832cd1b73e6c73700cc5.jpg"
              />
            </div>

          ) : (
          <div className="grid grid-cols-1 gap-4">
            {currentDoctors.map(({ doctor, appointments }) => (
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
                groupedAppointments={groupAppointmentsByDate(appointments)}
              />
            ))}
          </div>
          )}
          {doctorsWithAppointments.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
