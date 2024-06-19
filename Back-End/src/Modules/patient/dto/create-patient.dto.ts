export class CreatePatientDto {
  name: string;
  age: number;
  phone: number;
  email: string;
  password: string;
  address: {
    city: string;
    street: string;
    country: string;
  };
  image: string;
}
