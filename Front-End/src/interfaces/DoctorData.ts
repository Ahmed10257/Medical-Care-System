export interface Address {
    city: string;
    country: string;
    region: number;
  }
  
 export interface IDoctor {
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    password: string;
    about: string;
    address: Address;
    birthdate: string;
    fees: number;
    genaralSpecialization: string;
    gender: string;
    image: string;
    isDoctor: boolean;
    specializes: string[];
    views: number;
    waitingTime:number
  }
  


interface IAddress {
  city: string;
  street: string;
  country: string;
}

 export interface IPatient {
  _id: string;
  name: string;
  age: number;
  phone: number;
  email: string;
  addresses: IAddress[];
  image: string;
  gender: string;
  birthDate: string;
  isPatient: boolean;
  medicaalRecord: string[];
}

export interface IReview {
  _id: string;
  patient: IPatient;
  doctor?:string
  rating: number;
  review: string;
  createdAt: string;
}

export interface ICountPatientReview{
  doctorId:number
  patientCount:number
}

export interface IRating {
  rating:number
}