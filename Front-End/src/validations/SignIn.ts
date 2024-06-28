import { SignInInputs } from "../interfaces/SignInInputs";

export const validateSignIn = (values: SignInInputs) => {
  const errors: SignInInputs = {
    email: "",
    password: "",
  };

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password ) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  } else if (values.password.length > 20) {
    errors.password = "Password must be 20 characters or less";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(values.password)) {
    errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }

  return errors;
};
