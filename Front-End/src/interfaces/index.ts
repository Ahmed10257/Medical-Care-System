export interface Address {
    country: string;
    city: string;
    region: number;
}

export interface Clinic {
    street: string;
    building: string;
}

export interface Doctor {
    _id: string;
    name: string;
    phone: number;
    email: string;
    password: string;
    address: Address;
    image: string;
    gender: string;
    birthdate: string;
    isDoctor: boolean;
    specialization: string;
    rating: number;
    numberOfVisitors: number;
    clinic: Clinic;
    fees: number;
    waitingTime: number;
    contactInfo: string;
}

export interface Appointment {
    _id: string;
    date: string;
}

export interface DoctorWithAppointments {
    _id: string;
    doctor: Doctor;
    appointments: Appointment[];
}

interface PatientAddress {
    _id: string;
    city: string;
    street: string;
    country: string;
}

export interface Patient {
    _id: string;
    name: string;
    age: number;
    phone: string;
    email: string;
    password: string;
    addresses: PatientAddress[];
    image: string;
    gender: 'male' | 'female';
    birthDate: string;
    isPatient: boolean;
    medicalRecord: string[];
}
export interface BookingConfirmationProps {
    patientName: string;
    bookingDate: string;
    doctorName: string;
    waitingTime: string;
    examinationFees: string;
    vezeetaPoints: number;
}
export interface AppointmentDetails {
    _id: string;
    doctor_id: string;
    patient_id: string;
    date: string;
    status: string;
}