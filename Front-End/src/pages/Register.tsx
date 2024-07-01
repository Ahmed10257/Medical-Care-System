import { ChangeEvent, FormEvent, useState } from "react";
import FormTemplate from "../components/login-signup/FormTemplate";
import Input from "../components/login-signup/Input";
import { formInputsList } from "../data/SignUpInputs";
import ErrorMessage from "../components/login-signup/ErrorMessage";
import { validateSignUp } from "../validations/SignUp";
import { userGender } from "../types/SignUp";
import { IUser } from "../interfaces/SignUpInputs";
import Button from "../components/login-signup/Button";
import { Link } from "react-router-dom";
import FaceBookBtn from "../components/login-signup/FaceBookBtn";
import OrWithLine from "../components/login-signup/OrWithLine";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [errors, setError] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    phone: "",
  });

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    gender: "" as userGender,
    birthDate: "",
    phone: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setError({
      ...errors,
      [name]: "",
    });
  };

  const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorMessages = validateSignUp({
      ...user,
      [name]: name === "gender" ? (value as userGender) : value,
    });

    setError({
      ...errors,
      [name]: errorMessages[name as keyof IUser],
    });
  };

  const onSubmitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorMessages = validateSignUp(user);

    const isValid = Object.values(errorMessages).every((value) => value === "");
    if (!isValid) {
      setError(errorMessages);
      return;
    }

    try {
      axios
        .post("http://localhost:3000/auth/signup", user)
        .then((response) => {
          console.log(response.data);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Registered successfully!",
          }).then(() => {
            window.location.href = "/signin";
          });
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          let displayMessage = "Something went wrong!";
          if (errorMessage.includes("Email already exists")) {
            displayMessage =
              "Email already exists. Please use a different email.";
          } else if (errorMessage.includes("Invalid credentials")) {
            displayMessage = "Invalid credentials provided.";
          }

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: displayMessage,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const renderDialogFormInputs = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col items-end">
      <div className="flex w-full justify-between space-x-3 space-y-5 lg:items-center md:items-center sm:items-start lg:flex-row md:flex-row sm:flex-col">
        <label htmlFor={input.id} className="sm:ml-3">
          {input.label}
          {input.required && <span className="text-red-500">*</span>}
        </label>
        {input.type === "radio" ? (
          <div className="flex space-x-4 lg:w-7/12 md:w-7/12 sm:w-full">
            {input.options?.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={input.name}
                  value={option}
                  checked={user.gender === option}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  className="mr-1 focus:ring-blue-500 focus:outline-none"
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <Input
            type={input.type}
            name={input.name}
            id={input.id}
            value={user[input.name as keyof IUser]?.toString() || ""}
            onChange={onChangeHandler}
            placeholder={input.placeholder}
            onBlur={onBlurHandler}
            error={errors[input.name as keyof IUser]}
            className="sm:w-full md:w-7/12 lg:w-7/12"
          />
        )}
      </div>
      <div className="w-7/12 text-start p-1">
        <ErrorMessage message={errors[input.name as keyof typeof errors]} />
      </div>
    </div>
  ));

  return (
    <div className="flex justify-center">
      <FormTemplate
        title="Register"
        lgWidth="4/12"
        mdWidth="6/12"
        smWidth="11/12"
      >
        <FaceBookBtn />
        <OrWithLine />
        <form
          className="flex flex-col text-sm text-gray-500 mt-6"
          onSubmit={onSubmitFormHandler}
        >
          {renderDialogFormInputs}

          <div className="w-full flex justify-end text-xs text-end mt-4">
            <p className="text-xs text-gray-500 w-7/12 text-start">
              By signing up you agree to our{" "}
              <a href="#" className="text-blue-500 underline">
                Terms Of Use
              </a>
            </p>
          </div>

          <div className="mt-2 flex justify-end">
            <div className="w-7/12 flex justify-start">
              <Button type="submit" className="bg-red-600 w-28">
                JOIN NOW
              </Button>
            </div>
          </div>
        </form>

        <hr className="mt-8 font-bold w-96 border-gray-400 m-auto" />

        <div className="flex justify-center mt-6 mb-6">
          <p className="text-sm font-bold text-gray-500 me-3">
            Already Registered?
          </p>
          <div className="flex flex-col">
            <Link to={"/signin"} className="text-blue-500 text-sm font-bold">
              Login
            </Link>
            <hr className="border-red-500 border" />
          </div>
        </div>
      </FormTemplate>
    </div>
  );
};

export default Register;
