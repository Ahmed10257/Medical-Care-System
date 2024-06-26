import React, { useState } from 'react';
import './AppointmentForm.css';
import { Calendar } from "lucide-react";
import axios from 'axios';
import Swal from 'sweetalert2';

interface AppointmentFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, onCancel }) => {
  const [dateTime, setDateTime] = useState<string | null>(null);

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dateTime) {
      const dateTimeString = new Date(dateTime).toISOString();
      console.log(dateTimeString);

      try {
        await axios.post('http://localhost:3000/available-appointments', {
          doctor_id: '667980ed403c655bd6da3b61',
          date: dateTimeString
        });

        onSubmit(); 
        setDateTime(null);

       
        Swal.fire({
          icon: 'success',
          title: 'Appointment added',
          showConfirmButton: false,
          timer: 1500 
        });
      } catch (error) {
        console.error('Error submitting appointment:', error);
        alert('Error submitting appointment. Please try again.'); 
      }
    } else {
      alert('Please select both date and time.');
    }
  };

  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <div className='center-adjust'>
      <div className='add-form-container'>
        <h1
          className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
          style={{
            background: "#0487D9",
            color: "white",
          }}
        >
          New Appointment
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="flex flex-col md:flex-row ">
              <label className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0">
                <Calendar className="inline mx-1 w-4 h-5" />
                Date:
              </label>
              <input
                type="datetime-local"
                value={dateTime || ''}
                onChange={handleDateTimeChange}
                className={`shadow appearance-none focus:border-blue-400 border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                required
              />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">Add Appointment</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
