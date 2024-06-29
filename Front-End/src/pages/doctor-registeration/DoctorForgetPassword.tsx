import { Mail } from "lucide-react";
import FormTemplate from "../../components/login-signup/doctor/FormTemplate";
import InputDoctor from "../../components/login-signup/doctor/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { configAxios } from "../../config/api";
import { Link } from "react-router-dom";

const DoctorForgetPassword = () => {
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
    } else if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid Email Address");
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await configAxios.post("/doctor-auth/forget-password", { email });
      setMessage("Password reset link sent successfully");
      setEmail("");
    } catch (err) {
      setError("Failed to send password reset link");
    }
  };

  return (
    <div className="mt-10">
      <FormTemplate
        title="Forget Your Password?"
        subTitle="Use Your email to reset password"
      >
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col w-full mt-16 mb-16">
            <div className="text-gray-500 m-auto">
              <Mail size={200} strokeWidth={0.5} />
            </div>
            <InputDoctor
              icon={Mail}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${error ? "border-red-500" : ""}`}
              error={error || message}
              />
            <button
              type="submit"
              className="bg-blue-600 m-auto text-white p-2 rounded-sm text-sm font-bold w-5/12 mt-2"
            >
              Continue
            </button>
            <Link
              to="/doctor/login"
              className="text-blue-500 mt-4 m-auto underline font-bold"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </FormTemplate>
    </div>
  );
};

export default DoctorForgetPassword;
