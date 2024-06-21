export interface Address {
  country: string;
  city: string;
  street: string;
}

export interface FormData {
  name: string;
  email: string;
  age: number;
  phone: number;
  addresses: Address[];
  birthDate: string;
}
