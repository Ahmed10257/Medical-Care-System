import React, { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css';
import { DoctorData } from './Entity';
import Swal from 'sweetalert2';
import { Mail, User , Phone, MapPin, Image } from "lucide-react";

interface UpdateFormProps {
  doctorData: DoctorData;
  onUpdate: (updatedData: DoctorData) => void;
  onClose: () => void;
  
}

const UpdateForm: React.FC<UpdateFormProps> = ({ doctorData, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<DoctorData>(doctorData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <>
    <div className='form-container' >
    <div className="update-form-container">
    <h1
      className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
      style={{
      background: "#0487D9",
      color: "white",
      }}
      >
        Profile management
      </h1>
      <br/>
      <form className="update-form mt-5 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row ">
        <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
        htmlFor="name"
              >
                <User className="inline mx-1 w-4 h-5" />
                Name
              </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            `}
        />
        </div>
        <br/>
       
        <div className="flex flex-col md:flex-row ">
        <label
          className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
            htmlFor="city"
          >
          <MapPin className="inline mx-1 w-5 h-5" />
          City
        </label>
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          placeholder="City"
          className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            `}
        />
        </div>
        <br/>
        <div className="flex flex-col md:flex-row ">
        <label
          className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
            htmlFor="country"
          >
          <MapPin className="inline mx-1 w-5 h-5" />
          Country
          </label>
          <input
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          placeholder="Country"
          className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            `}
        />
        </div>
        <br/>
        <div className="flex flex-col md:flex-row items-center">
        <label
          className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
            htmlFor="phone"
          >
          <Phone className="inline mx-1 w-4 h-5" />
          Phone
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone.toString()}
          onChange={handleChange}
          placeholder="Phone"
          className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            `}
        />
        </div>
       <br/>
        <div className="flex flex-col md:flex-row ">
        <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
          htmlFor="email"
        >
          <Mail className="inline mx-1 w-4 h-5" />
          Email
          </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            `}
        />
        </div>
        <br/>
        <div className="flex flex-col md:flex-row ">
        <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="image"
              >
                <Image className="inline mx-1 w-4 h-5" />
                Image
              </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
              `}
          />
        </div>
        <br/>
        <div className="image-container">
        {formData.image && (
            <img src={formData.image} alt="Doctor" className="uploaded-image" />
          )}
          </div>
        <div className="form-buttons">
          <button 
          type="submit"
          className="text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 mr-4"
          style={{ backgroundColor: "#F21313" }}
           >Update</button>
          <button 
          type="button"
           onClick={onClose}
            className="bg-gray-500 w-full md:w-28 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"

            >
              Cancel</button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default UpdateForm;
