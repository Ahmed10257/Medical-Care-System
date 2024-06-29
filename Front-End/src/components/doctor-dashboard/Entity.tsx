import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entity.css';
import { Mail, User, Phone, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import UpdateForm from './UpdateForm';
import WorkingForm from './WorkingForm';
import PasswordForm from './PasswordForm'; // Import the PasswordForm component

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
  rating: number;
  numberOfVisitors: number;
  password: string;
  clinic: {
    street: string;
    building: string;
  };
  fees: number;
  waitingTime: number;
  contactInfo: string;
  about: string;
  __v: number;
}

const Entity: React.FC = () => {
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showWorkingInfoForm, setShowWorkingInfoForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false); // State for password form visibility

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get<DoctorData>('http://localhost:3000/doctor/667ff9815e77f767fdfdad82');
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
    setShowWorkingInfoForm(false);
    setShowPasswordForm(false); // Hide all forms
  };

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showDoctorForm ? (
        <UpdateForm doctorData={doctorData} onUpdate={handleEntityUpdate} onClose={() => setShowDoctorForm(false)} />
      ) : showWorkingInfoForm ? (
        <WorkingForm
          onUpdate={handleEntityUpdate}
          onClose={() => setShowWorkingInfoForm(false)}
          initialData={{ fees: doctorData.fees, waitingTime: doctorData.waitingTime, about: doctorData.about }}
        />
      ) : showPasswordForm ? (
        <PasswordForm
          doctorId={doctorData._id}
          onClose={() => setShowPasswordForm(false)}
        />
      ) : (
        <>
          <h1
            className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
            style={{
              background: '#0487D9',
              color: 'white',
            }}
          >
            Personal Information
          </h1>
          <div className="entity-container">
            <div className="entity-card card bg-custom">
              <div className="card-body">
                <div className="row">
                  <div>
                    <div className="entity-img-container">
                      <img src={doctorData.image} alt="Entity" className="img-fluid mb-3 entity-img" />
                      <h2 className="entity-title">Dr. {doctorData.name}</h2>
                    </div>
                    <h2 className="entity-title">About The Clinic</h2>
                    <p className="entity-description">
                      <DollarSign className="inline m-2 mx-1 w-5 h-5" />
                      Fees: {doctorData.fees}
                      <br />
                      <Clock className="inline m-2 mx-1 w-5 h-5" />
                      Waiting Time: {doctorData.waitingTime}
                      <br />
                      <User className="inline m-2 mx-1 w-5 h-5" />
                      {doctorData.about}
                    </p>
                    <button onClick={() => setShowWorkingInfoForm(true)} className="update-button">
                      Update Working Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="entity-info">
            <div className="doctor-card col-sm-8">
              <h5 className="card-title mb-2 entity-title">About The Doctor</h5>
              <p className="card-text entity-description">
                <Briefcase className="inline m-2 mx-1 w-5 h-5" />
                Specialty: {doctorData.specialization}
                <br />
                <MapPin className="inline m-2 mx-1 w-5 h-5" />
                Location: {doctorData.address.city}, {doctorData.address.country}
                <br />
                <Phone className="inline m-2 mx-1 w-5 h-5" />
                Contact: {doctorData.phone}
                <br />
                <Mail className="inline m-2 mx-1 w-5 h-5" />
                Email: {doctorData.email}
              </p>
              <button onClick={() => setShowDoctorForm(true)} className="update-button">
                Update Doctor Info
              </button>
            </div>
          </div>
          <div className="text-center"> {/* Center align the button */}
            <button onClick={() => setShowPasswordForm(true)} className="update-button">
              Update Password
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Entity;
