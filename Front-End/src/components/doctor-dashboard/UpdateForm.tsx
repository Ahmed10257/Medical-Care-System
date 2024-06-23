import React, { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css';
import { DoctorData } from './Entity';
import Swal from 'sweetalert2';

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
        text: 'Doctor data updated successfully.',
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
    <div className="update-form-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="form-input"
        />
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          placeholder="City"
          className="form-input"
        />
        <input
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          placeholder="Country"
          className="form-input"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone.toString()}
          onChange={handleChange}
          placeholder="Phone"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
        />
        <div className="image-upload">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="form-input"
          />
          {formData.image && (
            <img src={formData.image} alt="Doctor" className="uploaded-image" />
          )}
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Update</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
