import React, { ChangeEvent, useEffect, useState } from "react";
import { Phone, CalendarFold, MapPin, Mail, User, Baby } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { egyptianCities } from "../../data/patient-profile";
import { FormData } from "../../interfaces/patient-profile";
import { validate } from "../../utils/patient-profile-func";

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

  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:3000",
    });
    api
      .get("/patient/667b250f09e1016668590d19")
      .then((response) => {
        const { name, email, age, phone, addresses, birthDate } = response.data;
        setFormData({
          name: name || "",
          email: email || "",
          age: age || "",
          phone: phone || 0,
          addresses:
            addresses && addresses.length > 0
              ? addresses
              : [
                  {
                    country: "",
                    city: "",
                    street: "",
                  },
                ],
          birthDate: birthDate || "",
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
      setErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    axios
      .patch("http://localhost:3000/patient/667b250f09e1016668590d19", formData)
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

  if (isLoading) console.log(isLoading);
  if (error) console.log(error);

  return (
    <div className="container">
      <div className="bg-white shadow-md rounded-lg text-left pt-0">
        <h1
          className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
          style={{
            background: "#0487D9",
            color: "white",
          }}
        >
          Profile management
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 p-4">
          <div className="mb-4">
            <div className="flex flex-col md:flex-row ">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="name"
              >
                <User className="inline mx-1 w-4 h-5" />
                Name
              </label>
              <input
                className={`shadow appearance-none  rounded w-full md:w-8/12 focus:border-blue-400 border-solid border-2 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.name ? "border-red-500" : ""
                }`}
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs lg:ml-32 font-bold italic mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="email"
              >
                <Mail className="inline mx-1 w-4 h-5" />
                Email
              </label>
              <input
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs lg:ml-32 font-bold italic mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0">
                <MapPin className="inline mx-1 w-4 h-5" />
                Region
              </label>
              <Select
                className="w-full md:w-8/12 md:ml-4 md:mt-0 mt-2"
                options={egyptianCities.map((city) => ({
                  value: city,
                  label: city,
                }))}
                value={{
                  value: formData.addresses[0]?.city || "",
                  label: formData.addresses[0]?.city || "",
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
            {errors.city && (
              <p className="text-red-500 lg:ml-32 font-bold text-xs italic mt-1">
                {errors.city}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="age"
              >
                <Baby className="inline mx-1 w-4 h-5" />
                Age
              </label>
              <input
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.age ? "border-red-500" : ""
                }`}
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
            </div>
            {errors.age && (
              <p className="text-red-500 lg:ml-32 font-bold text-xs italic mt-1">
                {errors.age}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="phone"
              >
                <Phone className="inline mx-1 w-4 h-5" />
                Phone
              </label>
              <input
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.phone ? "border-red-500" : ""
                }`}
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 lg:ml-32 font-bold text-xs italic mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="birthDate"
              >
                <CalendarFold className="inline mx-1 w-4 h-5" />
                Birth
              </label>
              <input
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.birthDate ? "border-red-500" : ""
                }`}
                id="birthDate"
                type="datetime-local"
                name="birthDate"
                value={
                  formData.birthDate
                    ? new Date(formData.birthDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleChange}
                placeholder="Enter your birthDate"
              />
            </div>
            {errors.birthDate && (
              <p className="text-red-500 lg:ml-32 font-bold text-xs italic mt-1 text-center">
                {errors.birthDate}
              </p>
            )}
          </div>

          <div className="flex justify-center flex-col md:flex-row  gap-4 md:gap-8 mt-4">
            <button
              className="text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              style={{ backgroundColor: "#F21313" }}
              type="submit"
            >
              Update
            </button>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="bg-gray-500 w-full md:w-28 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
