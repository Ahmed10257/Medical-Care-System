import React, { ChangeEvent, useEffect, useState } from "react";
import { Phone, CalendarFold, MapPin, Mail, User } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

// List of Egyptian cities
import { egyptianCities } from "../../data/patient-profile";

interface Address {
  country: string;
  city: string;
  street: string;
}

interface FormData {
  name: string;
  email: string;
  age: string;
  phone: number;
  addresses: Address[];
  birthDate: string;
}

const UpdateForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    phone: 0,
    addresses: [
      {
        country: "",
        city: "",
        street: "",
      },
    ],
    birthDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:3000",
    });
    api
      .get("/patient/6673fb26688bcd7f251520e5")
      .then((response) => {
        console.log(response.data);
        setFormData({
          ...response.data,
          birthDate: response.data.birthDate || "",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("addresses.")) {
      const addressIndex = parseInt(name.split(".")[1], 10);
      const field = name.split(".")[2];

      setFormData((prevFormData) => {
        const updatedAddresses = [...prevFormData.addresses];
        updatedAddresses[addressIndex] = {
          ...updatedAddresses[addressIndex],
          [field]: value,
        };

        return {
          ...prevFormData,
          addresses: updatedAddresses,
        };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "birthDate" ? new Date(value).toISOString() : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch("http://localhost:3000/patient/6673fb26688bcd7f251520e5", formData)
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: `${response.data.name}'s data has been updated successfully`,
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: `An error occurred while updating the data!`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="container mx-auto p-4 w-5/12">
      <div className=" mx-auto bg-white shadow-md rounded-md border border-gray-300 p-6">
        <div>
          <h1 className="text-2xl font-bold text-center">Update Profile</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              <User className="inline justify-center align-middle mx-1 w-4 h-5 m-auto" />
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              <Mail className="inline justify-center align-middle mx-1 w-4 h-5 m-auto" />
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              <MapPin className="inline justify-center align-middle mx-1 w-4 h-5 m-auto" />
              Region
            </label>
            <Select
              options={egyptianCities.map((city) => ({
                value: city,
                label: city,
              }))}
              value={{
                value: formData.addresses[0].city,
                label: formData.addresses[0].city,
              }}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    addresses: [
                      {
                        ...prevFormData.addresses[0],
                        city: selectedOption.value,
                      },
                    ],
                  }));
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
            />
          </div>
          <div className="mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                <Phone className="inline justify-center align-middle mx-1 w-4 h-5 m-auto" />
                Phone:
              </label>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthDate"
            >
              <CalendarFold className="inline justify-center align-middle mx-1 w-4 h-5 m-auto" />
              Birth Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthDate"
              type="datetime-local"
              name="birthDate"
              value={
                formData.birthDate
                  ? new Date(formData.birthDate).toISOString().slice(0, 19)
                  : ""
              }
              onChange={handleChange}
              placeholder="Enter your birthDate"
            />
          </div>
          <div className="space-x-5">
            <div className="inline items-center justify-between">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </div>
            <div className=" inline items-center justify-between">
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
