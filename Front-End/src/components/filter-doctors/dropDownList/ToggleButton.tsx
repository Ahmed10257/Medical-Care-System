import { ComponentType, useState } from "react";

interface IProps {
  className?: string;
  name: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}
const ToggleButton = ({ className, name, icon: Icon, ...rest }: IProps) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };
  return (
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
  );
};

export default ToggleButton;
