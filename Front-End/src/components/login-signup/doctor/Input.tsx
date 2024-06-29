import React, { ChangeEvent, ComponentType, FocusEvent } from "react";

interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  checked?: boolean;
}

const InputDoctor: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
  error,
  icon: Icon,
  checked,
}) => {
  const inputClass = `w-full transition-all duration-300 border-b ${
    value ? "border-grey-500" : "border-gray-500"
  } focus:outline-none ${className}`;

  return (
    <div className="flex flex-col mb-4">
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-0">
            <Icon className={`w-5 h-5 ${error ? "text-red-500": "text-gray-400"}`} />
          </span>
        )}
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          checked={checked}
          className={`${inputClass} ${Icon ? "pl-6" : ""}`}
        />
      </div>
      {error && <span className="text-red-500 text-sm font-bold">{error}</span>}
    </div>
  );
};

export default InputDoctor;
