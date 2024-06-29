import { ChangeEvent, FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormTemplate from '../components/login-signup/FormTemplate';
import Input from '../components/login-signup/Input';
import ErrorMessage from '../components/login-signup/ErrorMessage';
import Button from '../components/login-signup/Button';
import { configAxios } from '../config/api';
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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const token = searchParams.get('token');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const onConfirmChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!password || !confirmPassword) {
      setError('Password and confirm password are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await configAxios.post('/doctor-auth/doctor-reset-password', { token, password });
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
    <div className="flex justify-center">
      <FormTemplate title="Reset Password" lgWidth="3/12" mdWidth="3/12" smWidth="3/12">
        <form className="flex flex-col text-xs text-gray-500 mt-6 w-full items-center lg:items-center md:items-center mb-10" onSubmit={onSubmitHandler}>
          <div className="space-y-5 mb-5 text-xs text-gray-500">
            <p>Enter your new password</p>
          </div>
          <div className="flex flex-col w-full lg:w-8/12 md:w-full items-center">
            <div className="flex flex-col w-full space-y-2 lg:items-start md:items-start">
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChangeHandler}
                onBlur={() => setError(validatePassword(password))}
                error={error}
                className="w-full sm:w-full md:w-full lg:w-full p-2"
                placeholder="New Password"
              />
            </div>
            <div className="w-full text-left p-1">
              {error && <ErrorMessage message={error} />}
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-8/12 md:w-full items-center">
            <div className="flex flex-col w-full space-y-2 lg:items-start md:items-start">
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={onConfirmChangeHandler}
                onBlur={() => {
                  if (confirmPassword && password !== confirmPassword) {
                    setError('Passwords do not match');
                  }
                }}
                error={error}
                className="w-full sm:w-full md:w-full lg:w-full p-2"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="w-full text-left p-1">
              {error && <ErrorMessage message={error} />}
            </div>
          </div>

          <div className="mt-4 flex w-full justify-center lg:justify-center">
            <div className="w-full lg:w-8/12 md:w-full flex justify-center lg:justify-start">
              <Button type="submit" className="bg-red-600 w-full sm:w-full lg:w-full md:w-full">
                Reset Password
              </Button>
            </div>
          </div>
        </form>
      </FormTemplate>
    </div>
  );
};

export default ResetPassword;
