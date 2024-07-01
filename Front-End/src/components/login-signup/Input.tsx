import { ChangeEvent } from "react";

interface InputProps {
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error: string;
  className?: string;
}

const Input = ({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  onBlur,
  error,
  className,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      className={`${className} border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
  );
};

export default Input;
