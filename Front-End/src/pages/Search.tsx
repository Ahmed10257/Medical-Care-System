import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/DoctorCard';
import { Doctor } from '../interfaces';
const dummyAppointments = [
    { date: '2024-06-25', time: '10:00 AM' },
    { date: '2024-06-25', time: '02:00 PM' },
    { date: '2024-06-26', time: '11:00 AM' },
];
const Search = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/doctor')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
            });
    }, []);

    return (
        <div className="App">
            {doctors.map(doctor => (
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
                    appointments={dummyAppointments}
                />
            ))}
        </div>
    );
};

export default Search;
