export interface Address {
  country: string;
  city: string;
  street: string;
}

export interface FormData {
  name: string;
  email: string;
  age: string;
  phone: number;
  addresses: Address[];
  birthDate: string;
}

export interface FormPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PatientAppointment {
  doctorAddress: string;
  _id: string;
  doctor_id?: string;
  patient_id?: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  doctorName?: string;
  address?: {
    country: string;
    city: string;
    region: number;
  };
}
