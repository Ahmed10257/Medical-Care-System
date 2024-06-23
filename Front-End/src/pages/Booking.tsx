import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from '../components/BookedDoctorCard';
import BookingForm from '../components/BookingForm';
import { Doctor, Appointment, Patient } from '../interfaces';

interface RouteParams {
  doctor_id: string;
  appointment_id: string;
  [key: string]: string | undefined;
}

const Book: React.FC = () => {
  const { doctor_id, appointment_id } = useParams<RouteParams>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorResponse = await axios.get<Doctor>(`http://localhost:3000/doctor/${doctor_id}`);
        setDoctor(doctorResponse.data);

        const appointmentResponse = await axios.get<Appointment>(`http://localhost:3000/available-appointments/${appointment_id}`);
        setAppointment(appointmentResponse.data);

        const patientId = "6675bf9a2be1ad7bb7b1b2f9";
        const patientResponse = await axios.get<Patient>(`http://localhost:3000/patient/${patientId}`);
        setPatient(patientResponse.data);
      } catch (err) {
        setError('Error fetching doctor, appointment, or patient details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctor_id, appointment_id]);

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    // i will implemenete it later insh'allah ''))
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!doctor || !appointment || !patient) {
    return <div>Doctor, appointment, or patient data not available</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-gray-100 py-0 lg:py-10 space-y-6 lg:space-y-0 lg:space-x-2">
      <div className="w-full lg:w-1/2 flex-grow lg:mt-0">
        <DoctorCard
          name={doctor.name}
          specialty={doctor.specialization}
          availableTime={`Available on: ${new Date(appointment.date).toLocaleString()}`}
          imageUrl={doctor.image}
        />
      </div>
      <div className="w-full lg:w-2/3 flex-grow h-full lg:h-auto">
        <BookingForm onSubmit={handleFormSubmit} initialPatientData={patient} />
      </div>
    </div>
  );
};

export default Book;
