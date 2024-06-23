import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import './Patients.css'; // Import your custom CSS file

interface Patient {
  _id: string;
  name: string;
  phone: number;
  birthDate: string; // Assuming birthDate is in ISO string format
}

interface Appointment {
  _id: string;
  doctor_id: string;
  patient_id: string;
  date: string;
  status: string;
}

const Patients: React.FC = () => {
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
  const [patientsPerPage] = useState(10); // Number of patients per page
  const doctorId = '667505aa0cf8fa0abdff5162'; // Replace with the actual doctor ID

  useEffect(() => {
    const fetchAppointmentsAndPatients = async () => {
      setLoading(true); // Set loading state to true while fetching

      try {
        // Fetch all appointments
        const appointmentsResponse = await axios.get<Appointment[]>(
          `http://localhost:3000/appointments`
        );

        const allAppointments = appointmentsResponse.data;
        
        // Filter appointments to get completed appointments for the specific doctor
        const completedAppointments = allAppointments.filter(
          appointment => appointment.doctor_id === doctorId && appointment.status === 'completed'
        );

        // Extract patient IDs from completed appointments
        const patientIds = completedAppointments.map(appointment => appointment.patient_id);

        // Fetch all patients
        const patientsResponse = await axios.get<Patient[]>(`http://localhost:3000/patient`);

        // Filter patients based on patient IDs from completed appointments
        const patients = patientsResponse.data.filter(patient =>
          patientIds.includes(patient._id)
        );

        // Update patientsData state
        setPatientsData(patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchAppointmentsAndPatients();
  }, [doctorId]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase()); // Search in lowercase
  };

  // Function to format date to display only date part
  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' }); // Adjust timeZone as per your requirement
  };

  // Function to display only first 7 characters of _id
  const formatId = (id: string) => {
    return id.substring(0, 7);
  };


  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filter patients based on search term
  const filteredPatients = patientsData.filter((patient) => {
    const searchText = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchText) ||
      patient._id.toLowerCase().includes(searchText) ||
      patient.phone.toString().toLowerCase().includes(searchText) ||
      patient.birthDate.toLowerCase().includes(searchText)
    );
  });

   // Pagination logic
   const indexOfLastPatient = currentPage * patientsPerPage;
   const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
   const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  return (
    <>
      <h1 className='h1'>Patients</h1>
      <div className='container'>
        <div className="patients-table">
          <div className="search-container mb-3">
            <input
              type="text"
              placeholder="Search Patients"
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="search-icon">
              <i className="fas fa-search"></i>
            </span>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="no-patients-found">
              <img src="https://cdn-icons-png.flaticon.com/512/12104/12104584.png" alt="No Patients" className="no-patients-img" />
              <span>No patients found.</span>
            </div>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Patient</th>
                    <th scope="col">Medical ID</th>
                    <th scope="col">Contacts</th>
                    <th scope="col">Birth Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPatients.map((patient) => (
                    <tr key={patient._id}>
                      <td>{patient.name}</td>
                      <td>{formatId(patient._id)}</td> 
                      <td>{patient.phone}</td>
                      <td>{formatDate(patient.birthDate)}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination controls */}
              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(filteredPatients.length / patientsPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Patients;
