import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMoneyBillWave, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BookingConfirmationProps } from '../../interfaces';
const BookingConfirmationCard: React.FC<BookingConfirmationProps> = ({
  patientName,
  bookingDate,
  doctorName,
  waitingTime,
  examinationFees,
  vezeetaPoints,
}) => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md text-left" style={{ width: '800px' }}>
      <div className="mb-6 flex justify-center">
        <img src="https://i.pinimg.com/736x/68/cb/bd/68cbbd86c62d667d270e6a1c50837959.jpg" alt="Success" className="h-auto" style={{ height: '200px', width: 'auto' }} />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-green-600">Your booking was successfully submitted</h2>
        <p className="mt-2 text-gray-700"><FontAwesomeIcon icon={faEnvelope} /> We notified Dr. {doctorName} of your booking</p>
        <p className="mt-1 text-gray-700"><FontAwesomeIcon icon={faMoneyBillWave} /> Examination Fees: {examinationFees}</p>
        <p className="mt-1 text-gray-700"><FontAwesomeIcon icon={faInfoCircle} /> Vezeeta Points: {vezeetaPoints}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4"><FontAwesomeIcon icon={faInfoCircle} /> Booking details</h3>
        <p className="text-gray-700"><strong>Patient name:</strong> {patientName}</p>
        <p className="text-gray-700"><strong>Booking date:</strong> {bookingDate}</p>
        <p className="text-gray-700"><strong>Doctor Name:</strong> Dr. {doctorName}</p>
        <p className="text-gray-700"><strong>Waiting Time:</strong> {waitingTime}</p>
      </div>
      <button className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        My Appointments
      </button>
    </div>
  );
};

export default BookingConfirmationCard;
