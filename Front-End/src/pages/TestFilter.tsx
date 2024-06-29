import { useEffect, useState } from "react";
import Filter from "../components/filter-doctors/filter-box/Filter";
import axios from "axios";
import SortDoctorsDropDown from "../components/sort-doctors/SortDropDown";

const TestFilter = () => {
  const [data, setData] = useState([
    {
      _id: "",
      name: "",
      age: 0,
      gender: "",
      address: {
        city: "",
        street: "",
        country: "",
      },
      fees: 0,
    },
  ]);
  const [filteredData, setFilteredData] = useState([
    {
      _id: "",
      name: "",
      age: 0,
      gender: "",
      address: {
        city: "",
        street: "",
        country: "",
      },
      fees: 0,
    },
  ]);
  const [error, setError] = useState<null | string>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    title: [],
    gender: [],
    availability: [],
    examinationFee: [],
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:3000",
    });
    api
      .get("/doctor")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleFilterChange = (filterName: string, selectedOptions: unknown) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedOptions,
    }));
  };

  useEffect(() => {
    filterData();
  }, [selectedFilters]);

  const filterData = () => {
    let filtered = data;

    if (selectedFilters.title.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFilters.title.includes(item.specialization)
      );
    }
    if (selectedFilters.gender.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFilters.gender.includes(item.gender)
      );
    }
    if (selectedFilters.availability.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFilters.availability.includes(item.availability)
      );
    }
    if (selectedFilters.examinationFee.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFilters.examinationFee.some((feeRange: string) => {
          if (feeRange === "any") return true;
          if (feeRange.startsWith("Less than")) {
            const max = Number(feeRange.split(" ")[2]);
            return item.fees < max;
          } else if (feeRange.startsWith("Greater than")) {
            const min = Number(feeRange.split(" ")[2]);
            return item.fees > min;
          } else {
            const range = feeRange.match(/(\d+)\s+to\s+(\d+)/);
            if (range) {
              const min = Number(range[1]);
              const max = Number(range[2]);
              console.log(`Filtering with range: min=${min}, max=${max}`);
              return item.fees >= min && item.fees <= max;
            } else {
              console.error(`Invalid fee range format: ${feeRange}`);
              return false;
            }
          }
        })
      );
    }

    setFilteredData(filtered);
  };

  return (
    <div className="p-4">
      <Filter onFilterChange={handleFilterChange} />
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Fees</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item._id}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.age}</td>
                  <td className="py-2 px-4 border-b">{item.gender}</td>
                  <td className="py-2 px-4 border-b">{item.address.country}</td>
                  <td className="py-2 px-4 border-b">{item.fees}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <SortDoctorsDropDown />
    </div>
  );
};

export default TestFilter;
