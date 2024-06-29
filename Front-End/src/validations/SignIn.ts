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

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};
