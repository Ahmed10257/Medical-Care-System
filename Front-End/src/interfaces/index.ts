// interfaces.ts
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
    date: string;
}

export interface DoctorWithAppointments {
    _id: string;
    doctor: Doctor;
    appointments: Appointment[];
}
