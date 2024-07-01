import { DoctorSignUp } from "../interfaces/DoctorSignUp";

export const DoctorSignUpValidation = (values: DoctorSignUp) => {
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    genaralSpecialization: "",
    address: {
      region: "",
      city: "",
      state: "",
    },
    image: "",
    gender: "",
    birthdate: "",
  };

  if (!values.firstName) {
    errors.firstName = "First Name is required";
  } else if (values.firstName.length < 2) {
    errors.firstName = "First Name must be 2 characters or more";
  } else if (values.firstName.length > 20) {
    errors.firstName = "First Name must be 20 characters or less";
  } else if (!/^[a-zA-Z]+$/.test(values.firstName)) {
    errors.firstName = "First Name must contain only letters";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  } else if (values.lastName.length < 2) {
    errors.lastName = "Last Name must be 2 characters or more";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Last Name must be 20 characters or less";
  } else if (!/^[a-zA-Z]+$/.test(values.lastName)) {
    errors.lastName = "Last Name must contain only letters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.birthdate) {
    errors.birthdate = "Birthdate is required";
  } else {
    const birthdate = new Date(values.birthdate);
    if (isNaN(birthdate.getTime())) {
      errors.birthdate = "Birthdate is invalid";
    } else if (new Date().getFullYear() - birthdate.getFullYear() < 18) {
      errors.birthdate = "You must be 18 years or older";
    }
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  } else if (values.password.length > 20) {
    errors.password = "Password must be 20 characters or less";
  } else if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{11}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!values.genaralSpecialization) {
    errors.genaralSpecialization = "specialization is required";
  } else if (values.genaralSpecialization.length < 2) {
    errors.genaralSpecialization = "specialization must be 2 characters or more";
  } else if (values.genaralSpecialization.length > 20) {
    errors.genaralSpecialization = "specialization must be 20 characters or less";
  }

  if (!values.address.region) {
    errors.address!.region = "Region is required";
  } else {
    const region = Number(values.address.region);
    if (isNaN(region)) {
      errors.address!.region = "Region must be a valid number";
    } else if (region < 1) {
      errors.address!.region = "Region must be 1 or more";
    } else if (region > 20) {
      errors.address!.region = "Region must be 20 or less";
    }
  }

  if (!values.address.city) {
    errors.address.city = "City is required";
  } else if (values.address.city.length < 2) {
    errors.address.city = "City must be 2 characters or more";
  } else if (values.address.city.length > 20) {
    errors.address.city = "City must be 20 characters or less";
  } else if (!/^[a-zA-Z\s]+$/.test(values.address.city)) {
    errors.address.city = "City must contain only letters";
  }

  if (!values.address.state) {
    errors.address.state = "State is required";
  } else if (values.address.state.length < 2) {
    errors.address.state = "State must be 2 characters or more";
  } else if (values.address.state.length > 20) {
    errors.address.state = "State must be 20 characters or less";
  } else if (!/^[a-zA-Z\s]+$/.test(values.address.state)) {
    errors.address.state = "State must contain only letters";
  }

  return errors;
};
