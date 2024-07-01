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
import { Appointment } from '../../interfaces/Booking';
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
  groupedAppointments: { [key: string]: Appointment[] };
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
    groupedAppointments,
    id,
  } = props;

  console.log("dID", id);

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
    if (currentIndex < Object.keys(groupedAppointments).length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBook = (appointmentId: string) => {
    navigate(`/book/${id}/${appointmentId}`);
  };

  const dates = Object.keys(groupedAppointments);

  return (
    <div className="max-w-5xl rounded-lg overflow-hidden shadow-lg border p-4 bg-white flex flex-col md:flex-row md:items-stretch md:justify-between hover:bg-gray-50 transition-colors duration-300">
      {/* First Column: Image */}
      <div className="w-full md:w-1/5 flex justify-center items-center mb-4 md:mb-0">
        <img className="w-24 h-24 rounded-full" src={imageUrl} alt="Profile" />
      </div>

      {/* Second Column: Information */}
      <div className="w-full md:w-3/5 pr-4 text-left flex flex-col justify-center">
        <a href={`/doctor/${id}`} className="font-bold text-xl mb-2 hover:text-blue-500">
          {name}
        </a>
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
      <div className="w-full md:w-3/5 pl-4 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="appointment-container flex flex-col md:flex-row md:justify-between w-full">
            {dates.slice(currentIndex, currentIndex + 1).map((date) => (
              <div key={date} className="flex flex-col items-center m-2 p-2 rounded-lg shadow-md-top shadow-md-left shadow-md-right w-32 h-48 md:w-auto md:h-auto">
                <div className="date bg-blue-500 text-white py-1 px-2 rounded-t-lg text-center text-md border-b-2 border-white">
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="appointments flex-grow overflow-y-auto flex flex-col justify-start items-center bg-white border-2 border-gray-300 rounded w-full h-full py-2">
                  <AppointmentCard
                    appointments={groupedAppointments[date]}
                    onBook={handleBook}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="controls flex justify-between w-full mt-2">
            <button
              onClick={handlePrev}
              className={`bg-blue-500 text-white px-3 py-1 rounded-full ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentIndex === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNext}
              className={`bg-blue-500 text-white px-3 py-1 rounded-full ${currentIndex >= dates.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentIndex >= dates.length - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
