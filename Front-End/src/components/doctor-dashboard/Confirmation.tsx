import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

import './Confirmation.css';
import './CustomStyle.css';

interface Appointment {
  _id: string;
  doctor_id: string;
  patient_id: string;
  date: string;
  status: string;
}

interface Patient {
  _id: string;
  name: string;
}

const Confirmation: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<{ [key: string]: string }>({});
  const [doctorId, setDoctorId] = useState<string>('667ff9815e77f767fdfdad82'); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/appointments`, {
        params: {
          doctor_id: doctorId
        }
      });

      // Filter appointments to include only 'confirmed', 'cancelled', and 'completed' statuses
      const filteredAppointments = response.data.filter((appointment: Appointment) =>
        ['confirmed', 'cancelled', 'completed'].includes(appointment.status)
      );

      setAppointments(filteredAppointments);

      // Fetch patient names for the filtered appointments
      const patientIds = filteredAppointments.map(appointment => appointment.patient_id);
      const uniquePatientIds = Array.from(new Set(patientIds));

      const patientResponses = await Promise.all(
        uniquePatientIds.map(id => axios.get(`http://localhost:3000/patient/${id}`))
      );

      const patientsData: { [key: string]: string } = {};
      patientResponses.forEach(response => {
        const patient = response.data;
        patientsData[patient._id] = patient.name;
      });

      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleCompleteAppointment = async (appointmentId: string) => {
    try {
      await axios.patch(`http://localhost:3000/appointments/${appointmentId}`, {
        status: 'completed'
      });
      updateAppointmentStatus(appointmentId, 'completed');
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment._id === appointmentId ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  const isActiveButton = (appointmentId: string, action: string) => {
    const appointment = appointments.find(appointment => appointment._id === appointmentId);
    if (!appointment) return false;

    if (action === 'complete') {
      return appointment.status === 'confirmed';
    }
    return false;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); 
  };

  const filteredAppointments = appointments.filter(appointment => {
    const patientName = patients[appointment.patient_id]?.toLowerCase() || '';
    const status = appointment.status.toLowerCase();
    const date = new Date(appointment.date).toLocaleDateString().toLowerCase();

    return (
      patientName.startsWith(searchTerm) ||
      status.startsWith(searchTerm) ||
      date.startsWith(searchTerm)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      <div className="confirmation-container">
        <div className='confirmation-header'>
          <h1
      className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
      style={{
      background: "#0487D9",
      color: "white",
      }}
      >
        Confirmed Appointments
      </h1>
        </div>
        <div className="appointment-list">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name, status, or date"
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="search-icon">
              <i className="fas fa-search"></i>
            </span>
          </div>
          {currentAppointments.length === 0 ? (
            <div className="no-appointments">
              <img src="https://cdn-icons-png.flaticon.com/512/12104/12104584.png" alt="No Patients" className="no-patients-img" />
              <p>No appointments found.</p>
            </div>
          ) : (
            <>
              <table className="appointment-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointments.map(appointment => (
                    <tr key={appointment._id}>
                      <td>{patients[appointment.patient_id]}</td>
                      <td>{new Date(appointment.date).toLocaleDateString()}</td>
                      <td>{new Date(appointment.date).toLocaleTimeString()}</td>
                      <td>{appointment.status}</td>
                      <td>
                        {appointment.status === 'confirmed' && (
                          <button
                            className={`btn complete ${isActiveButton(appointment._id, 'complete') ? 'active' : ''}`}
                            onClick={() => handleCompleteAppointment(appointment._id)}
                            disabled={!isActiveButton(appointment._id, 'complete')}

                          >
                            Complete

                          </button>
                        )}
                        {appointment.status === 'completed' && (
                          <i className="fas fa-check-circle completed-icon" title="Completed"></i>
                        )}
                        {appointment.status === 'cancelled' && (
                          <i className="fas fa-times-circle cancelled-icon" title="Cancelled"></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Confirmation;
