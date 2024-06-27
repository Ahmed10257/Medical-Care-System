import { IFormInput } from "../interfaces/SignUpInputs";

export const formInputsList: IFormInput[] = [
  {
    id: "name",
    name: "name",
    label: "Your Name",
    type: "text",
    placeholder: "First Name And Last Name",
    required: true,
  },    
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "text",
    placeholder: "example@domain.com",
    required: true,
  },
  {
    id: "phone",
    name: "phone",
    label: "Mobile Number",
    type: "text",
    placeholder: "Mobile Number",
    required: true,
  },
  {
    id: "gender",
    name: "gender",
    label: "Gender",
    type: "radio",
    placeholder: "",
    required: true,
    options: ["male", "female"]
  },
  {
    id: "birthDate",
    name: "birthDate",
    label: "Birth Date",
    type: "date",
    placeholder: "Birth Date",
    required: false,
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];
