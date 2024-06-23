import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entity.css';
import UpdateForm from './UpdateForm';

interface Address {
  country: string;
  city: string;
  region: number;
}

export interface DoctorData {
  _id: string;
  name: string;
  phone: number;
  email: string;
  address: Address;
  image: string;
  gender: string;
  birthdate: string;
  isDoctor: boolean;
  specialization: string;
  __v: number;
}

const Entity: React.FC = () => {
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get<DoctorData[]>('http://localhost:3000/doctor/667505aa0cf8fa0abdff5162');
        const doctor = response.data; 
        setDoctorData(doctor); 
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, []);

  const handleEntityUpdate = (updatedData: DoctorData) => {
    setDoctorData(updatedData);
    setShowDoctorForm(false); // Hide the form after updating
  };

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showDoctorForm ? (
        <UpdateForm doctorData={doctorData} onUpdate={handleEntityUpdate} onClose={() => setShowDoctorForm(false)} />
      ) : (
        <>
          <h1 className='h1'>Personal Information</h1>
          <div className="entity-card card bg-custom">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <img src={doctorData.image} alt="Entity" className="img-fluid mb-3 entity-img" />
                  <h2 className='entity-title'>{doctorData.name}</h2>
                  <p className='entity-description'>Entity Description for the entity and its values and purposes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="doctor-card col-sm-8">
            <h5 className="card-title mb-2 entity-title">{doctorData.name}</h5>
            <p className="card-text entity-description">
              Specialty: {doctorData.specialization}<br /><br />
              Location: {doctorData.address.city}, {doctorData.address.country}<br /><br />
              Contact: {doctorData.phone}<br /><br />
              Email: {doctorData.email}
            </p>
            <button onClick={() => setShowDoctorForm(true)} className="update-button">Update Doctor Info</button>
          </div>
        </>
      )}
    </>
  );
};

export default Entity;
