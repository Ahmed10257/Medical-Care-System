import { ChangeEvent, FormEvent, useState } from "react";
import FormTemplate from "../components/login-signup/FormTemplate";
import Input from "../components/login-signup/Input";
import ErrorMessage from "../components/login-signup/ErrorMessage";
import Button from "../components/login-signup/Button";
import { Link } from "react-router-dom";
import { configAxios } from "../config/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setMessage("");
  };

  const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!email) {
      setError("Email Address is required");
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await configAxios.post('/auth/forget-password', { email });
      setMessage("Password reset link sent successfully");
      setEmail("");
    } catch (err) {
      setError("Failed to send password reset link");
    }
  };

  return (
    <div className="flex justify-center">
      <FormTemplate
        title="Forget Password"
        lgWidth="3/12"
        mdWidth="3/12"
        smWidth="3/12"
      >
        <form
          className="flex flex-col text-xs text-gray-500 mt-6 w-full items-center lg:items-center md:items-center mb-10"
          onSubmit={onSubmitHandler}
        >
          <div className="space-y-5 mb-5 text-xs text-gray-500">
            <p>No problem. We'll help you recover it</p>
            <p>Enter your email address to reset your password</p>
          </div>
          <div className="flex flex-col w-full lg:w-8/12 md:w-full items-center">
            <div className="flex flex-col w-full space-y-2 lg:items-start md:items-start">
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                error={error}
                className="w-full sm:w-full md:w-full lg:w-full p-2"
                placeholder="Email"
              />
            </div>
            <div className="w-full text-left p-1">
              {error && <ErrorMessage message={error} />}
              {message && <p className="text-green-500">{message}</p>}
            </div>
          </div>

          <div className="mt-4 flex w-full justify-center lg:justify-center">
            <div className="w-full lg:w-8/12 md:w-full flex justify-center lg:justify-start">
              <Button
                type="submit"
                className="bg-red-600 w-full sm:w-full lg:w-full md:w-full"
              >
                Send Password
              </Button>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              to="/signin"
              className="text-blue-500 text-sm font-bold underline"
            >
              Or Back to Login
            </Link>
          </div>
        </form>
      </FormTemplate>
    </div>
  );
};

export default ForgetPassword;
