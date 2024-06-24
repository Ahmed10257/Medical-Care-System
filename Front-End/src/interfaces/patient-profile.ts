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
