import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/DoctorCard';
import { DoctorWithAppointments } from '../interfaces';

const Search = () => {
    const [doctorsWithAppointments, setDoctorsWithAppointments] = useState<DoctorWithAppointments[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/available-appointment/doctors-with-appointments')
            .then(response => {
                setDoctorsWithAppointments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
            });
    }, []);

    return (
        <div className="App grid gap-4">
            {doctorsWithAppointments.map(({ doctor, appointments }) => (
                <Card
                    key={doctor._id}
                    id={doctor._id}
                    imageUrl={doctor.image}
                    name={doctor.name}
                    title={doctor.specialization}
                    rating={doctor.rating}
                    ratingsCount={doctor.numberOfVisitors}
                    specialization={doctor.specialization}
                    location={`${doctor.clinic.street}, ${doctor.clinic.building}`}
                    fees={doctor.fees}
                    waitingTime={`${doctor.waitingTime} Minutes`}
                    phoneNumber={doctor.contactInfo}
                    appointments={appointments}
                />
            ))}
        </div>
    );
};

export default Search;
