import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faMoneyBillWave,
  faClock,
  faPhone,
  faStar,
  faStarHalfAlt,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../../interfaces';
import AppointmentCard from '../AppointmentCard';

interface IProps {
  imageUrl: string;
  name: string;
  title: string;
  rating: number;
  ratingsCount: number;
  specialization: string;
  location: string;
  fees: number;
  waitingTime: string;
  phoneNumber: string;
  appointments: Appointment[];
  id: string;
}

const Card = (props: IProps) => {
  const {
    imageUrl,
    name,
    title,
    rating,
    ratingsCount,
    specialization,
    location,
    fees,
    waitingTime,
    phoneNumber,
    appointments,
    id,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-400" />
        ))}
      </>
    );
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < appointments.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBook = (appointmentId: string) => {
    navigate(`/book/${id}/${appointmentId}`);
  };

  return (
    <div className="max-w-4xl rounded-lg overflow-hidden shadow-lg border p-4 bg-white flex hover:bg-gray-50 transition-colors duration-300">
      {/* First Column: Image */}
      <div className="w-1/6 flex justify-center items-center">
        <img className="w-20 h-20 rounded-full" src={imageUrl} alt="Profile" />
      </div>

      {/* Second Column: Information */}
      <div className="w-3/6 pr-2 text-left">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{title}</p>
        <div className="flex items-center mb-2">
          {generateStars(rating)}
          <span className="ml-2 text-gray-600">({ratingsCount} Visitors)</span>
        </div>
        <p className="text-blue-500 mb-2">{specialization}</p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          {location}
        </p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
          Fees: {fees} EGP
        </p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          Waiting Time: {waitingTime}
        </p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          {phoneNumber}
        </p>
      </div>

      {/* Third Column: Appointments and Booking */}
      <div className="w-1/2 pl-2 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="appointment-container flex justify-between w-full">
            {appointments.slice(currentIndex, currentIndex + 3).map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                handleBook={() => handleBook(appointment.id)}
              />
            ))}
          </div>

          <div className="flex mt-4">
            <button onClick={handlePrev} className={`bg-gray-200 p-2 rounded-full focus:outline-none ${currentIndex === 0 ? 'invisible' : ''}`}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={handleNext} className={`bg-gray-200 p-2 rounded-full focus:outline-none ml-2 ${currentIndex >= appointments.length - 3 ? 'invisible' : ''}`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
