import { userGender } from "../types/SignUp";

export interface DoctorSignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    genaralSpecialization: string;
    address: {
        region: number;
        city: string;
        state: string;
    };
    image: string;
    gender: userGender;
    birthdate: string;
}

