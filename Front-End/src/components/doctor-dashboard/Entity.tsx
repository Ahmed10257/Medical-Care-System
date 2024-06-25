import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entity.css';
import { Mail, User , Phone, MapPin, Briefcase } from "lucide-react";

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
        const response = await axios.get<DoctorData[]>('http://localhost:3000/doctor/667980ed403c655bd6da3b61');
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
    setShowDoctorForm(false); 
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
          <h1
      className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
      style={{
      background: "#0487D9",
      color: "white",
      }}
      >
        Personal Information
      </h1>
         <div className='entity-container'>
         <div className="entity-card card bg-custom">
            <div className="card-body">
              <div className="row">
                <div >
                  <div className="entity-img-container">
                  <img src={doctorData.image} alt="Entity" className="img-fluid mb-3 entity-img" />
                  </div>
                  <h2 className='entity-title'>About The Doctor</h2>
                  <p className='entity-description'><User className="inline m-2 mx-1 w-5 h-5" />Entity Description for the entity and its values and purposes.</p>
                </div>
              </div>
            </div>
          </div>
         </div>
         <div className='entity-info'>
         <div className="doctor-card col-sm-8">
            <h5 className="card-title mb-2 entity-title">{doctorData.name}</h5>
            <p className="card-text entity-description">
            <Briefcase className="inline m-2 mx-1 w-5 h-5" />Specialty: {doctorData.specialization}<br /><br />
              <MapPin className="inline m-2 mx-1 w-5 h-5" />Location: {doctorData.address.city}, {doctorData.address.country}<br /><br />
              <Phone className="inline m-2 mx-1 w-5 h-5" />Contact: {doctorData.phone}<br /><br />
              <Mail className="inline m-2 mx-1 w-5 h-5" />Email: {doctorData.email}
            </p>
            <button onClick={() => setShowDoctorForm(true)}
             className="update-button"
             >Update Doctor Info</button>
          </div>
         </div>
         
        </>
      )}
    </>
  );
};

export default Entity;
