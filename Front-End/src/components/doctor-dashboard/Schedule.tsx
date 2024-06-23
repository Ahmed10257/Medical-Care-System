import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Schedule.css';

const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const handleAddAppointment = () => {
    // Implement your logic to add an appointment here
    console.log('Add Appointment clicked');
  };

  return (
    <>
    <h1 className='h1'>Appointments</h1>
    <div className="schedule-container">
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="add-appointment-container">
        {/* <h2>Doctor Appointment</h2> */}
        <button className="add-appointment-button" onClick={handleAddAppointment}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" /> Add Appointment
        </button>
        <div>
        {/* <h2>Doctor Appointments</h2> */}
        {/* <ul>
          <li>Appointment 1</li>
          <li>Appointment 2</li>
          <li>Appointment 3</li>
        </ul> */}
        <div className='appointment-list'>
        <span className='no-appointment'>There is no appointment yet</span>
        <img src='https://cdn.vezeeta.com/account-mgmt-web/1-22-7/assets/calendar.svg' alt='appointment' className='appointment-img' />
        </div>
        
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Schedule;
