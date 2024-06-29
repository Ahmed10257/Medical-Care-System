import FormTemplate from "../../components/login-signup/doctor/FormTemplate";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { validateSignIn } from "../../validations/SignIn";
import InputDoctor from "../../components/login-signup/doctor/Input";
import { Mail } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import Button from "../../components/login-signup/doctor/Button";
import { Link } from "react-router-dom";
import { configAxios } from "../../config/api";
import Swal from "sweetalert2";

interface IUser {
  email: string;
  password: string;
}

const DoctorLogin = () => {
  const [errors, setErrors] = useState<IUser>({
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

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorMessages = validateSignIn({
      ...user,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: errorMessages[name as keyof IUser],
    });
  };

  const onSubmitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorMessages = validateSignIn(user);

    const isValid = Object.values(errorMessages).every((value) => value === "");

    if (!isValid) {
      setErrors(errorMessages);
      return;
    }

    configAxios
      .post("/doctor-auth/login", user)
      .then((response) => {
        console.log("Login successful", response);
        console.log(response.data);

        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Logged in successfully!",
          }).then(() => (window.location.href = "/dashboard"));
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
              footer: '<a href="/signup">Click here to register</a>',
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
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  };

  return (
    <div className="mt-10">
      <FormTemplate title="Welcome back!">
        <form
          className="w-96 m-6 h-full flex flex-col items-center mb-16"
          onSubmit={onSubmitFormHandler}
        >
          <div className="flex flex-col w-full">
            <InputDoctor
              icon={Mail}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${errors.email ? "border-red-500" : ""}`}
              error={errors.email}
            />
          </div>
          <div className="flex flex-col w-full">
            <InputDoctor
              icon={LockKeyholeOpen}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${
                errors.password ? "border-red-500" : ""
              }`}
              error={errors.password}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md mt-4"
          >
            Sign In
          </Button>
          <div className="flex justify-center mt-4">
            <Link
              to="/doctor/doctor-forget-password"
              className="text-blue-500 font-bold text-sm underline"
            >
              Forget your password?
            </Link>
          </div>
        </form>
      </FormTemplate>
      <div className="flex justify-center mt-4 text-zinc-500 font-bold space-y-1 space-x-2">
        <p>Don't have an account?</p>
        <Link
          to="/doctor/register"
          className="text-blue-500 font-bold text-sm underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default DoctorLogin;
