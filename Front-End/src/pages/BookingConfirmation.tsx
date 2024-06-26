import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingConfirmationCard from '../components/BookingConfirmationCard';
import { AppointmentDetails, Doctor } from '../interfaces';

const BookingConfirmation: React.FC = () => {
  const { id, doctor_id } = useParams<{ id: string; doctor_id: string }>();
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState<string>("Unknown");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get<AppointmentDetails>(`http://localhost:3000/appointments/${id}`);
        setAppointment(response.data);

        const doctorResponse = await axios.get<Doctor>(`http://localhost:3000/doctor/${doctor_id}`);
        setDoctor(doctorResponse.data);

        const patientId = "6675bf9a2be1ad7bb7b1b2f8"
        const patientResponse = await axios.get<{ name: string }>(`http://localhost:3000/patient/${patientId}`);
        setPatientName(patientResponse.data.name);
      } catch (err) {
        setError('Error fetching appointment, doctor, or patient details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, doctor_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!appointment || !doctor) {
    return <div>Appointment or doctor data not available</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BookingConfirmationCard
        patientName={patientName}
        bookingDate={`Appointment Date: ${new Date(appointment.date).toLocaleString()}`}
        doctorName={doctor.name}
        waitingTime={doctor.waitingTime.toString()}
        examinationFees="300"
        vezeetaPoints={600}
      />
    </div>
  );
};

export default BookingConfirmation;
