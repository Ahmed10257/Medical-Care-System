import { ButtonHTMLAttributes, ComponentType, useState } from "react";
import CheckboxList from "./CheckboxList";
import { motion, AnimatePresence } from 'framer-motion';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
}

const ButtonWithCheckboxList = ({ className, name, icon: Icon, options, onFilterChange, ...rest }: IProps) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
    onFilterChange(newSelectedOptions);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={toggleCheckboxes}
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
        {showCheckboxes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden' }}
          >
            <CheckboxList options={options} onCheckboxChange={handleCheckboxChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ButtonWithCheckboxList;
