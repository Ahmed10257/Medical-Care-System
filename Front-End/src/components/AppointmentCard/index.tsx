import { Appointment } from '../../interfaces';

interface IProps {
    appointment: Appointment;
    handleBook: () => void;
}

const AppointmentCard = ({ appointment, handleBook }: IProps) => {
    const appointmentDate = new Date(appointment.date);
    const formattedDate = appointmentDate.getDate() === new Date().getDate() ? 'Today' : appointmentDate.getDate() === new Date().getDate() + 1 ? 'Tomorrow' : appointmentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });

    return (
        <div className="appointment-card flex flex-col items-center m-2 p-2 rounded-lg shadow-md-top shadow-md-left shadow-md-right  w-24 h-40">
            <div className="date bg-blue-500 text-white py-1 px-2 rounded-t-lg text-center text-md border" style={{ width: '100px' }}>
                {formattedDate}
            </div>
            <div className="time bg-white text-center py-1 px-2 w-full border-t border-b">
                <p className="text-gray-700 text-xs">{appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
            <button className="btn bg-red-500 text-white py-1 px-2 rounded-b-lg text-center text-md border mt-auto" style={{ width: "100px" }} onClick={handleBook}>
                BOOK
            </button>

        </div>
    );
};

export default AppointmentCard;
