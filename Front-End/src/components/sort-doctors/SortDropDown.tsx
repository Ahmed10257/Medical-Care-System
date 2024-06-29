import { useState, useEffect } from "react";
import { configAxios } from "../../config/api";

const SortDoctorsDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [doctors, setDoctors] = useState<{ id: string, name: string, fees: number, waitingTime: number }[]>([]);
  const [sortedDoctors, setSortedDoctors] = useState([
    {
      id: "",
      name: "",
      fees: 0,
      waitingTime: 0,
    },
  ]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await configAxios.get("/doctor");
        setDoctors(response.data);
        setSortedDoctors(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchDoctors();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    setIsOpen(false);
    sortDoctors(option);
  };

  const sortDoctors = (option) => {
    let sortedList = [...doctors];

    switch (option) {
      case "Price Low to High":
        sortedList.sort((a, b) => a.fees - b.fees);
        break;
      case "Price High to Low":
        sortedList.sort((a, b) => b.fees - a.fees);
        break;
      case "Less Wait Time":
        sortedList.sort((a, b) => a.waitingTime - b.waitingTime);
        break;
      default:
        break;
    }

    setSortedDoctors(sortedList);
  };

  return (
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
          className="block w-2/12 pl-3 pr-10 py-2 text-start border border-gray-300 focus:outline-none bg-white sm:text-sm rounded-md"
        >
          {selectedOption ? selectedOption : "Select an option"}
        </button>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-1/4 bg-white shadow-lg max-h-56 rounded-md p-6 space-y-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
      <div>
        {sortedDoctors.map((doctor) => (
          <div key={doctor.id} className="p-2 border-b border-gray-300">
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p>Price: {doctor.fees}</p>
            <p>Wait Time: {doctor.waitingTime} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortDoctorsDropDown;
