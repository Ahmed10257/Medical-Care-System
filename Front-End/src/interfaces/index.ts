export interface Doctor {
    _id: string;
    name: string;
    phone: number;
    email: string;
    password: string;
    address: {
        country: string;
        city: string;
        region: number;
    };
    image: string;
    gender: string;
    birthdate: string;
    isDoctor: boolean;
    specialization: string;
    rating: number;
    numberOfVisitors: number;
    clinic: {
        street: string;
        building: string;
    };
    fees: number;
    waitingTime: number;
    contactInfo: string;
} 