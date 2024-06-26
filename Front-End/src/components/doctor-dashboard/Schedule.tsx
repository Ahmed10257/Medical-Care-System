import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Schedule.css';
import './CustomStyle.css';
import AppointmentForm from './AppointmentForm';

const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const doctorId = '667980ed403c655bd6da3b61'; 

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/available-appointments', {
          params: {
            doctor_id: doctorId,
            date: date?.toISOString().split('T')[0] 
          }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [date]); 

  const handleDateChange = (e: { value: Date | Date[] }) => {
    if (e.value instanceof Date) {
      const selectedDate = new Date(e.value);
      selectedDate.setHours(12);  
      selectedDate.setMinutes(0); 
      
      setDate(selectedDate);
      console.log('Selected date:', selectedDate);
    }
  };
  

  const handlePrevDay = () => {
    if (date) {
      const prevDate = new Date(date);
      prevDate.setDate(date.getDate() - 1);
      setDate(prevDate);
      console.log('Previous day:', prevDate);
    }
  };

  const handleNextDay = () => {
    if (date) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      setDate(nextDate);
      console.log('Next day:', nextDate);
    }
  };

  const handleSetCurrentDate = () => {
    const currentDate = new Date();
    setDate(currentDate);
    console.log('Current date:', currentDate);
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddAppointment = (day: string, time: string) => {
    console.log('Adding appointment for:', day, time);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  // Filter appointments based on the selected date
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
    const selectedDate = date?.toISOString().split('T')[0];
    return appointmentDate === selectedDate;
  });

  return (
    <>
      <nav className="navbar1">
        <ul>
          <li>
            <Link to="/dashboard/schedule">Appointments</Link>
          </li>
          <li>
            <Link to="/dashboard/confirmation">Confirmations</Link>
          </li>
        </ul>
      </nav>
      <br />
      <div className="appointments-container">
        <div className="appointments-header">
          <div className="date-controls">
            <button onClick={handleSetCurrentDate}>Today</button>
            <button onClick={handlePrevDay}>&lt;</button>
            <button onClick={handleNextDay}>&gt;</button>
            <Calendar
              value={date}
              onChange={handleDateChange}
              showIcon
              dateFormat="M dd yy"
              appendTo={document.body}
              className="custom-calendar"
            />
          </div>
          <div className="add-appointment">
            {!showForm && (
              <button className="add-appointment-button" onClick={toggleForm}>
                Add Appointment
              </button>
            )}
            <button className="refresh-button" onClick={handleRefreshPage}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        <br/>
        {!showForm ? (
          <div className='appointments-by-day'>
          <div className="appointments-list">
            {loading ? (
              <p>Loading appointments...</p>
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <div key={index} className="appointment-item">
                  <p>{new Date(appointment.date).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <img
                  src="https://cdn.vezeeta.com/account-mgmt-web/1-22-7/assets/calendar.svg"
                  alt="appointment"
                  className="appointment-img"
                />
                <p>No appointments available for this doctor on the selected date</p>
              </div>
            )}
          </div>
          </div>
        ) : (
          <div className="appointment-form-container">
            <AppointmentForm onSubmit={handleAddAppointment} onCancel={handleCancelForm} />
          </div>
        )}
      </div>
    </>
  );
};

export default Schedule;
