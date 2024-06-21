import { useEffect, useState } from "react";
import Filter from "../components/filter-doctors/filter-box/Filter";
import axios from "axios";

// interface IData {
//     _id: string;
//     name: string;
//     age: number;
//     gender: string;
//     address: {
//         city: string;
//         street: string;
//         country: string;
//     };
// }
const TestFilter = () => {
  const [data, setData] = useState([]);
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
    }
  ]);
  const [error, setError] = useState<null | string>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    title: [],
    gender: [],
    availability: [],
    entity: [],
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:3000",
    });
    api
      .get("/doctor")
      .then((response) => {
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
    if (selectedFilters.entity.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFilters.entity.includes(item.entity)
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestFilter;
