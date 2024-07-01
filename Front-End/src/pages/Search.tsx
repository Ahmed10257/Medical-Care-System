import { useEffect, useState } from "react";
import Card from "../components/DoctorCard";
import { DoctorWithAppointments, Appointment } from "../interfaces/Booking";
import { useSearch } from "../contexts/SearchContext";
import Filter from "../components/filter-doctors/filter-box/Filter";
import SearchBar from "../components/SearchBar/SearchBar";
import { configAxios } from "../config/api";

const Search = () => {
  const [doctorsWithAppointments, setDoctorsWithAppointments] = useState<DoctorWithAppointments[]>([]);
  const [filteredDoctorsWithAppointments, setFilteredDoctorsWithAppointments] = useState<DoctorWithAppointments[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;
  const { searchResults } = useSearch();

  useEffect(() => {
    setDoctorsWithAppointments(searchResults);
    setFilteredDoctorsWithAppointments(searchResults);
  }, [searchResults]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctorsWithAppointments.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctorsWithAppointments.length / doctorsPerPage);

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
    return appointments.reduce((groups: { [key: string]: Appointment[] }, appointment) => {
      const date = new Date(appointment.date).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    }, {});
  };

  const [selectedFilters, setSelectedFilters] = useState({
    title: [],
    gender: [],
    availability: [],
    examinationFee: [],
  });

  const handleFilterChange = (filterName: string, selectedOptions: unknown) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedOptions,
    }));
  };

  useEffect(() => {
    filterData();
  }, [selectedFilters, doctorsWithAppointments]);

  const filterData = () => {
    let filtered = doctorsWithAppointments;

    if (selectedFilters.title.length > 0) {
      filtered = filtered.filter(({ doctor }) =>
        selectedFilters.title.includes(doctor.specialization)
      );
    }
    if (selectedFilters.gender.length > 0) {
      filtered = filtered.filter(({ doctor }) =>
        selectedFilters.gender.includes(doctor.gender)
      );
    }
    if (selectedFilters.availability.length > 0) {
      filtered = filtered.filter(({ appointments }) =>
        appointments.some(appointment =>
          selectedFilters.availability.includes(new Date(appointment.date).toDateString())
        )
      );
    }
    if (selectedFilters.examinationFee.length > 0) {
      filtered = filtered.filter(({ doctor }) =>
        selectedFilters.examinationFee.some((feeRange: string) => {
          if (feeRange === "any") return true;
          if (feeRange.startsWith("Less than")) {
            const max = Number(feeRange.split(" ")[2]);
            return doctor.fees < max;
          } else if (feeRange.startsWith("Greater than")) {
            const min = Number(feeRange.split(" ")[2]);
            return doctor.fees > min;
          } else {
            const range = feeRange.match(/(\d+)\s+to\s+(\d+)/);
            if (range) {
              const min = Number(range[1]);
              const max = Number(range[2]);
              return doctor.fees >= min && doctor.fees <= max;
            } else {
              console.error(`Invalid fee range format: ${feeRange}`);
              return false;
            }
          }
        })
      );
    }

    setFilteredDoctorsWithAppointments(filtered);
  };

  /**
   * Sorting
   */
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    setIsOpen(false);
    sortDoctors(option);
  };

  const sortDoctors = (option: string) => {
    let sortedList = [...filteredDoctorsWithAppointments];

    switch (option) {
      case "Price Low to High":
        sortedList.sort((a, b) => a.doctor.fees - b.doctor.fees);
        break;
      case "Price High to Low":
        sortedList.sort((a, b) => b.doctor.fees - a.doctor.fees);
        break;
      case "Less Wait Time":
        sortedList.sort((a, b) => a.doctor.waitingTime - b.doctor.waitingTime);
        break;
      default:
        break;
    }

    setFilteredDoctorsWithAppointments(sortedList);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 h-60 w-full">
          <SearchBar />
        </div>
        <div className="col-span-3 h-80 sticky top-80">
          <div className="p-4">
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="col-span-9">
          <div className="relative mt-5 mb-5">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700"
              >
                Sorting:
              </label>
              <button
                type="button"
                onClick={toggleDropdown}
                className="block w-4/12 pl-3 pr-10 py-2 text-start border border-gray-300 focus:outline-none bg-white sm:text-sm rounded-md"
              >
                {selectedOption ? selectedOption : "Select an option"}
              </button>
            </div>
            {isOpen && (
              <ul className="absolute z-10 mt-1 w-1/2 bg-white shadow-lg max-h-56 rounded-md p-6 space-y-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="sortOption"
                    value="Price Low to High"
                    id="lowToHigh"
                    checked={selectedOption === "Price Low to High"}
                    onChange={handleOptionChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="lowToHigh"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Price Low to High
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="sortOption"
                    value="Price High to Low"
                    id="highToLow"
                    checked={selectedOption === "Price High to Low"}
                    onChange={handleOptionChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="highToLow"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Price High to Low
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="sortOption"
                    value="Less Wait Time"
                    id="lessWaitTime"
                    checked={selectedOption === "Less Wait Time"}
                    onChange={handleOptionChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="lessWaitTime"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Less Wait Time
                  </label>
                </li>
              </ul>
            )}
          </div>

          {filteredDoctorsWithAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-128 mt-10 bg-gray-50 rounded-lg shadow-lg p-6">
              <h3 className="text-3xl font-bold text-gray-700">No Results Found</h3>
              <img
                className="w-1/4 mt-4"
                src="https://i.pinimg.com/236x/53/a5/9e/53a59edee823832cd1b73e6c73700cc5.jpg"
                alt="No Results"
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
          {filteredDoctorsWithAppointments.length > 0 && (
            <div className="flex justify-center items-center mt-4">
              <button
                className={`btn ${currentPage === 1 ? "hidden" : "block"} bg-blue-500 text-white px-4 py-2 rounded-full mr-2`}
                onClick={handlePrevPage}
              >
                Previous
              </button>
              <div className="flex">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`btn ${currentPage === index + 1
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
                className={`btn ${currentPage === totalPages ? "hidden" : "block"} bg-blue-500 text-white px-4 py-2 rounded-full ml-2`}
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

