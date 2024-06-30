import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface SelectOptions {
  name: string;
}

interface IProps {
  value: SelectOptions | null;
  onChange: (value: SelectOptions | null) => void;
  options: SelectOptions[];
  placeholder: string;
}

const DropDown = ({ placeholder, options, onChange }: IProps) => {
  const [selection, setSelection] = useState<SelectOptions | null>(null);
  const Selectoptions: SelectOptions[] = options;

  const handleChange = (e: DropdownChangeEvent) => {
    setSelection(e.value);
    onChange(e.value);
  };

  return (
    <div className="card flex justify-content-center ">
      <Dropdown
        value={selection}
        onChange={handleChange}
        options={Selectoptions}
        optionLabel="name"
        placeholder={placeholder}
        showClear
        className="w-full"
      />
    </div>
  );
};
export default DropDown;
