import { Appointment } from '../../interfaces';

interface IProps {
    appointment: Appointment;
    handleBook: () => void;
}

const AppointmentCard = ({ appointment, handleBook }: IProps) => {
    return (
        <div className="appointment-card flex flex-col items-center m-2 p-4 border rounded-lg shadow-md w-32 h-40">
            <div className="date bg-blue-500 text-white py-1 px-2 rounded-t-lg w-full text-center">
                {new Date(appointment.date).toLocaleDateString()}
            </div>
            <div className="time bg-white text-center py-2 px-2 w-full border-t border-b">
                <p className="text-gray-700">{new Date(appointment.date).toLocaleTimeString()}</p>
            </div>
            <button className="book-btn mt-auto bg-red-500 text-white py-1 px-4 rounded-b-lg w-full" onClick={handleBook}>
                BOOK
            </button>
        </div>
    );
};

export default AppointmentCard;
