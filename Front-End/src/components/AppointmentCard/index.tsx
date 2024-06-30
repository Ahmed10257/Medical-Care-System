import React, { useState } from 'react';
import { Appointment } from '../../interfaces/Booking';

interface IProps {
    appointments: Appointment[];
    onBook: (appointmentId: string) => void;
}

const AppointmentCard: React.FC<IProps> = ({ appointments, onBook }) => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="appointment-card w-64 h-80 text-center mb-4 px-4 py-2 flex flex-col justify-center items-center">
            {appointments.map((appointment) => (
                <div key={appointment.id} className="time-button-container w-full mb-2">
                    <button
                        className={`time-button w-full text-lg py-2 rounded-md transition-colors duration-300 ${selectedTime === appointment.id ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                        onClick={() => setSelectedTime(appointment.id)}
                    >
                        {formatTime(appointment.date)}
                    </button>
                </div>
            ))}
            <div className="book-button-container">
                <button
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                    onClick={() => selectedTime && onBook(selectedTime)}
                    disabled={!selectedTime}
                >
                    Book
                </button>
            </div>
        </div>
    );
};

export default AppointmentCard;
