import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormTemplate from '../../components/login-signup/doctor/FormTemplate';
import InputDoctor from '../../components/login-signup/doctor/Input';
import Button from '../../components/login-signup/Button';
import { configAxios } from '../../config/api';
import { LockKeyholeOpen } from 'lucide-react';
import Swal from 'sweetalert2';

const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be 6 characters or more";
  } else if (password.length > 20) {
    return "Password must be 20 characters or less";
  } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return "";
};

const DoctorResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const token = searchParams.get('token');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError('');
    }
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      await configAxios.post('/doctor-auth/reset-password', { token, password });
      Swal.fire(
        'Success',
        'Password reset successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to reset password');
      Swal.fire(
        'Error',
        'Failed to reset password',
        'error'
      );
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <FormTemplate title="Reset Your Password" subTitle="Enter your new password">
        <form
          className="flex flex-col text-xs text-gray-500 mt-6 w-full items-center lg:items-center md:items-center mb-10"
          onSubmit={onSubmitHandler}
        >
            <LockKeyholeOpen size={200} strokeWidth={0.5} />
          <div className="flex flex-col w-1/4">
            <InputDoctor
              icon={LockKeyholeOpen}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${error ? "border-red-500" : ""}`}
              error={error}
            />
          </div>

          <div className="mt-4 flex w-full justify-center lg:justify-center">
            <div className="w-full lg:w-8/12 md:w-full flex justify-center lg:justify-start">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-700 m-auto font-bold text-white w-2/12 sm:w-full lg:w-2/12 md:w-full">
                Continue
              </Button>
            </div>
          </div>
          <Link to="/doctor/login" className="text-blue-500 mt-5 font-bold underline">
            Back to Login
          </Link>
        </form>
      </FormTemplate>
    </div>
  );
};

export default DoctorResetPassword;
