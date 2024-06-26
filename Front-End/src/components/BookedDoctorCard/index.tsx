import React from 'react';

interface DoctorCardProps {
  name: string;
  specialty: string;
  availableTime: string;
  imageUrl: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, availableTime, imageUrl }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 mx-auto mb-6">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white"
        />
      </div>
      <div className="pt-12 flex flex-col items-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{specialty}</p>
      </div>
      <div className="mt-4 bg-gray-100 p-4 rounded-b-lg text-center">
        <p className="text-gray-700">{availableTime}</p>
        <p className="text-gray-700 font-semibold">Reservation required, first-come, first-served</p>
      </div>
    </div>
  );
};

export default DoctorCard;
