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
  appointments: Array<{ date: string; time: string }>;
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

  const handleBook = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="max-w-6xl rounded overflow-hidden shadow-lg border p-4 bg-white flex">
      {/* First Column: Image */}
      <div className="w-1/6 flex justify-center items-center">
        <img className="w-20 h-20 rounded-full" src={imageUrl} alt="Profile" />
      </div>

      {/* Second Column: Information */}
      <div className="w-4/6 p-4 text-left">
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
      <div className="w-5/12 p-4 flex flex-col items-center">
        <h3 className="font-bold text-lg mb-2">Appointments</h3>
        <div className="flex flex-col items-center">
          <div className="appointment-container flex justify-between w-full">
            {appointments.slice(currentIndex, currentIndex + 3).map((appointment, index) => (
              <div key={index} className="appointment-card flex flex-col items-center m-2 p-4 border rounded w-32">
                <div className="bg-blue-500 text-white py-1 px-2 rounded-t w-full text-center">{appointment.date}</div>
                <div className="bg-white text-center py-2 px-2 w-full">
                  <p className="text-gray-700">From {appointment.time.split(" ")[0]}</p>
                  <p className="text-blue-500">To {appointment.time.split(" ")[1]}</p>
                </div>
                <button className="mt-2 bg-red-500 text-white py-1 px-4 rounded w-full" onClick={handleBook}>BOOK</button>
              </div>
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
