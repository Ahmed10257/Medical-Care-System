import { IUser } from "../interfaces/SignUpInputs";

export const validateSignUp = (user: IUser) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    phone: "",
  };

  if (!user.name) {
    errors.name = "Name is required";
  } else if (user.name.length < 3) {
    errors.name = "Name needs to be 3 characters or more";
  }

  if (!user.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Email address is invalid";
  }

  if (!user.password) {
    errors.password = "Password is required";
  } else if (user.password.length < 6 || user.password.length > 20 || !/\d/.test(user.password) || !/[a-zA-Z]/.test(user.password)) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!user.phone) {
    errors.phone = "Mobile number is required";
  } else if (user.phone.length < 10) {
    errors.phone = "Mobile number needs to be 10 characters or more";
  }

  if (!user.birthDate) {
    errors.birthDate = "Birthdate is required";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(user.birthDate)) {
    errors.birthDate = "Birthdate must be in the format YYYY-MM-DD";
  }

  if (!user.gender) {
    errors.gender = "Gender is required";
  }

  return errors;
};
