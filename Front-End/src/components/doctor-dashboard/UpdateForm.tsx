import React, { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMapMarkerAlt, faEnvelope, faImage } from '@fortawesome/free-solid-svg-icons';
import { DoctorData } from './Entity';
import Swal from 'sweetalert2';

interface UpdateFormProps {
  doctorData: DoctorData;
  onUpdate: (updatedData: DoctorData) => void;
  onClose: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ doctorData, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<DoctorData>(doctorData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));

    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [key]: value
        }
      }));
    } else if (name === 'phone') {
      setFormData(prevData => ({ ...prevData, phone: Number(value) }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prevData => ({
        ...prevData,
        image: imageUrl
      }));
    }
  };

  const validate = (formData: DoctorData) => {
    const errors: { [key: string]: string } = {};

    if (!formData.name) {
      errors.name = "Name is required.";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters.";
    } else if (formData.name.length > 50) {
      errors.name = "Name must be at most 50 characters.";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      errors.name = "Name must contain only letters and spaces.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    const phoneRegex = /^[0-9]*$/;
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (formData.phone.toString().length !== 10) {
      errors.phone = "Phone number must be 10 digits.";
    } else if (!phoneRegex.test(formData.phone.toString())) {
      errors.phone = "Phone number must contain only numbers.";
    }

    if (!formData.address.city) {
      errors.city = "City is required.";
    }
    if (!formData.address.country) {
      errors.country = "Country is required.";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3000/doctor/${doctorData._id}`, formData);
      onUpdate(response.data);
      onClose();
      Swal.fire({
        title: 'Success!',
        text: 'Doctor Personal Info updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating doctor data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the doctor data.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <div className='form-container'>
        <div className="update-form-container">
          <h1 className="text-xl font-bold text-center w-full rounded-t-lg border p-1" style={{ background: "#0487D9", color: "white" }}>
            Profile Management
          </h1>
          <br />
          <form className="update-form mt-5 p-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="name">
                <FontAwesomeIcon icon={faUser} className="inline mx-1 w-4 h-5" />Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
              />
            </div>
            {errors.name && <p className="text-error">{errors.name}</p>}
            <br />
            <div className="flex flex-col md:flex-row">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="address.city">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="inline mx-1 w-4 h-5" />City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city && 'border-red-500'}`}
              />
            </div>
            {errors.city && <p className="text-error">{errors.city}</p>}
            <br />
            <div className="flex flex-col md:flex-row">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="address.country">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="inline mx-1 w-4 h-5" />Country
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                placeholder="Country"
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.country && 'border-red-500'}`}
              />
            </div>
            {errors.country && <p className="text-error">{errors.country}</p>}
            <br />
            <div className="flex flex-col md:flex-row items-center">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="phone">
                <FontAwesomeIcon icon={faPhone} className="inline mx-1 w-4 h-5" />Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone.toString()}
                onChange={handleChange}
                placeholder="Phone"
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone && 'border-red-500'}`}
              />
            </div>
            {errors.phone && <p className="text-error">{errors.phone}</p>}
            <br />
            <div className="flex flex-col md:flex-row">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="inline mx-1 w-4 h-5" />Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
              />
            </div>
            {errors.email && <p className="text-error">{errors.email}</p>}
            <br />
            <div className="flex flex-col md:flex-row">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="image">
                <FontAwesomeIcon icon={faImage} className="inline mx-1 w-4 h-5" />Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <br />
            <div className="form-buttons">
              <button
                type="submit"
                className="text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 mr-4"
                style={{ backgroundColor: "#F21313" }}
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 w-full md:w-28 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"

              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
