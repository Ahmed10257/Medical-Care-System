import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface SelectOptions {
  name: string;
}

interface IProps {
  value: SelectOptions | null;
  onChange: (e: DropdownChangeEvent) => void;
  options: SelectOptions[];
  placeholder: string;
}

const DropDown = ({ placeholder, options }: IProps) => {
  const [selection, setSelection] = useState<SelectOptions | null>(null);
  const Selectoptions: SelectOptions[] = options;

  return (
    <div className="card flex justify-content-center ">
      <Dropdown
        value={selection}
        onChange={(e: DropdownChangeEvent) => setSelection(e.value)}
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
