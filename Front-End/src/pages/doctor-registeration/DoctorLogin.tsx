import FormTemplate from "../../components/login-signup/doctor/FormTemplate";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { validateSignIn } from "../../validations/SignIn";
import InputDoctor from "../../components/login-signup/doctor/Input";
import { Mail } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import Button from "../../components/login-signup/doctor/Button";
import { Link } from "react-router-dom";

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

    // Handle successful form submission here
  };

  return (
    <div>
      <FormTemplate title="Welcome back!">
        <form
          className="w-96 h-full flex flex-col items-center mb-16"
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
          <div className="flex justify-center mt-4 text-zinc-500 font-bold space-y-1 space-x-2">
            <p>Don't have an account?</p>
            <Link
              to="/doctor/register"
              className="text-blue-500 font-bold text-sm underline"
            >
                Sign Up
            </Link>
          </div>
        </form>
      </FormTemplate>
    </div>
  );
};

export default DoctorLogin;
