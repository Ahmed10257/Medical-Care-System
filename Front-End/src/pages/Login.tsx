import { ChangeEvent, FormEvent, useState } from "react";
import FormTemplate from "../components/login-signup/FormTemplate";
import Input from "../components/login-signup/Input";
import ErrorMessage from "../components/login-signup/ErrorMessage";
import { validateSignIn } from "../validations/SignIn";
import Button from "../components/login-signup/Button";
import FaceBookBtn from "../components/login-signup/FaceBookBtn";
import OrWithLine from "../components/login-signup/OrWithLine";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { configAxios } from "../config/api";
import { getRole } from "../utils/functions";

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
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

    const errorMessages = validateSignIn({
      ...user,
      [name]: value,
    });

    setError({
      ...errors,
      [name]: errorMessages[name as keyof IUser],
    });
  };

  const onSubmitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorMessages = validateSignIn(user);

    const isValid = Object.values(errorMessages).every((value) => value === "");

    if (!isValid) {
      setError(errorMessages);
      return;
    }

    configAxios.post("/auth/login", user)
      .then((response) => {
        if (response.data.access_token) {
          console.log("Login response", response.data);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log(getRole());
          
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Logged in successfully!",
          }).then(() => window.location.href = "/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.log("Login error", error);
        const errorMessage = error.response.data.message;
        const displayMessage = "Something went wrong!";
        
        if (errorMessage.includes("Invalid credentials")) {
          if (errorMessage.includes("User not found")) {
            Swal.fire({
              icon: "error",
              title: "User not found",
              text: "The email you entered is not registered.",
              footer: '<a href="/signup">Click here to register</a>'
            });
          } else if (errorMessage.includes("Password mismatch")) {
            Swal.fire({
              icon: "error",
              title: "Incorrect Password",
              text: "The password you entered is incorrect. Please try again.",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: displayMessage,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
  };

  return (
    <div className="flex justify-center">
      <FormTemplate title="Login" lgWidth="3/12" smWidth="11/12" mdWidth="6/12">
        <form
          className="flex flex-col text-xs text-gray-500 mt-6 w-full items-center lg:items-center md:items-center mb-10"
          onSubmit={onSubmitFormHandler}
        >
          <div className="flex flex-col w-full lg:w-8/12 md:w-full items-center">
            <div className="flex flex-col w-full space-y-2 lg:items-start md:items-start">
              <label htmlFor="email" className="w-full text-left">
                Email
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                error={errors.email}
                className="w-full sm:w-full md:w-full lg:w-full p-2"
              />
            </div>
            <div className="w-full text-left p-1">
              <ErrorMessage message={errors.email} />
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-8/12 md:w-full items-center mt-4">
            <div className="flex flex-col w-full space-y-2 lg:items-start md:items-start">
              <label htmlFor="password" className="w-full text-left">
                Password
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                error={errors.password}
                className="w-full sm:w-full md:w-full lg:w-full p-2"
              />
            </div>
            <div className="w-full text-left p-1">
              <ErrorMessage message={errors.password} />
            </div>
          </div>
          <div className="mt-4 flex w-full justify-center lg:justify-center">
            <div className="w-full lg:w-8/12 md:w-full flex justify-center lg:justify-start">
              <Button
                type="submit"
                className="bg-red-600 w-full sm:w-full lg:w-full md:w-full"
              >
                LOGIN
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-8/12 md:w-full lg:justify-between flex justify-between text-xs text-gray-500 mt-4">
            <div>
              <input type="checkbox" className="me-1" />
              <label>Remember me</label>
            </div>
            <div className="ms-2">
              <Link to="/forget-password" className="text-blue-500 text-bold">
                Forgot Your Password?
              </Link>
            </div>
          </div>
          
        </form>

        <OrWithLine />
        <FaceBookBtn />

        <div>
          <div className="flex justify-center mt-1 mb-5">
            <p className="text-sm font-bold text-gray-500 me-3">New User?</p>
            <div className="flex flex-col">
              <Link to="/signup" className="text-blue-500 text-sm font-bold">
                Sign Up
              </Link>
              <hr className="border-red-500 border" />
            </div>
          </div>
        </div>
      </FormTemplate>
    </div>
  );
};

export default Login;
