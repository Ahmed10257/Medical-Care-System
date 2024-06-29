import { ComponentType, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface RadioListProps {
  options: string[];
  onRadioChange: (selectedOption: string) => void;
  className?: string;
  name: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}

const RadioList = ({
  options,
  onRadioChange,
  className,
  name,
  icon: Icon,
  ...rest
}: RadioListProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showRadioOptions, setShowRadioOptions] = useState(false);
  
  const toggleRadioOptions = () => {
    setShowRadioOptions(!showRadioOptions);
  };

  const handleChange = (option: string) => {
    setSelectedOption(option);
    onRadioChange(option);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={toggleRadioOptions}
        className={`flex w-full h-10 items-center text-blue-500 ${className}`}
        {...rest}
      >
        <div className="flex flex-col space-y-2 items-center justify-center me-2">
          {Icon && <Icon />}
          <hr className="border border-red-700 w-2" />
        </div>
        {name}
      </button>
      <AnimatePresence initial={false}>
        {showRadioOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden' }}
          >
            {options.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name={name}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleChange(option)}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RadioList;
