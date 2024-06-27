import { userGender } from "../types/SignUp";

export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: userGender;
  birthDate: string;
  phone: string;
}

export interface IFormInput {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}
    