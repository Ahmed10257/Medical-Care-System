import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface BookingFormProps {
  onSubmit: (formData: { name: string; phone: string; email: string; onBehalf: boolean }) => void;
  initialPatientData: { name: string; phone: string; email: string };
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, initialPatientData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    onBehalf: false,
  });

  useEffect(() => {
    if (!formData.onBehalf) {
      setFormData({
        name: initialPatientData.name,
        phone: initialPatientData.phone.toString(),
        email: initialPatientData.email,
        onBehalf: false,
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        onBehalf: true,
      });
    }
  }, [formData.onBehalf, initialPatientData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="bg-white shadow-lg rounded-lg p-10 w-full md:w-2/3 mx-auto mt-0"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold mb-4 text-white p-2 rounded-md text-center" style={{
        backgroundColor: '#0070CD',
      }}>
        Enter Your Info.
      </h3>

      <div className="mb-6 relative">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <div className="relative">
          <PhoneInput
            country={'eg'}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'phone',
              required: true,
              className: 'w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700',
            }}
            buttonClass="absolute left-0 pl-2 flex items-center text-gray-400"
            containerClass="w-full relative"
            inputStyle={{
              paddingLeft: '3rem',
              width: '100%',
            }}
            dropdownStyle={{
              width: '250px',
              fontSize: '16px',
              padding: '10px 0',
            }}
            dropdownClass="custom-phone-dropdown"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          name="onBehalf"
          checked={formData.onBehalf}
          onChange={handleChange}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <span className="ml-2 text-gray-700">I am booking on behalf of another patient</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-700 flex items-center">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          Vezeeta Points Earned
        </span>
        <span className="text-yellow-500 font-semibold flex items-center">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          350 points
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        >
          Book
        </button>
        <button
          type="button"
          className="w-full py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400"
          onClick={() => setFormData({ name: '', phone: '', email: '', onBehalf: false })}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
