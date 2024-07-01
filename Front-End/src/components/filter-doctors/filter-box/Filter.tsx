import { FilterIcon } from "lucide-react";
import ButtonWithCheckboxList from "../dropDownList/DropList";
import { GraduationCap } from "lucide-react";
import { GitPullRequestClosed } from "lucide-react";
import { CalendarCheck2 } from "lucide-react";
import { useState } from "react";
import { FilterProps } from "../../../types/filterDoctor";
import RadioList from "../dropDownList/RadioList";

const title = ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Surgery"];
const gender = ["Male", "Female"];
const availability = ["Any Day", "Today", "Tomorrow"];
const examinationFee = ["any", "Less than 50", "From 50 to 100", "From 100 to 200", "From 200 to 300", "Greater than 300"];

const Filter = ({ onFilterChange }: FilterProps) => {
  const [, setSelectedFilters] = useState({
    title: [],
    gender: [],
    availability: [],
    examinationFee: [],
  });

  const handleFilterChange = (filterName: string, selectedOptions: string[]) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedOptions,
    }));
    onFilterChange(filterName, selectedOptions);
  };

  const handleRadioChange = (filterName: string, selectedOption: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: [selectedOption],
    }));
    onFilterChange(filterName, [selectedOption]);
  };

  return (
    <div className="w-48 rounded-2xl border bg-white mb-5">
      <div className="flex m-10 mb-0 ml-0 mt-0 pl-7 bg-blue-600 w-full h-10 items-center rounded-t-2xl text-white">
        <FilterIcon className="me-2" />
        <p>Filters</p>
      </div>
      <div className="flex items-center space-x-2 pl-7 p-3">
        <ButtonWithCheckboxList
          name={"Title"}
          icon={GraduationCap}
          options={title}
          onFilterChange={(selectedOptions) => handleFilterChange("title", selectedOptions)}
        />
      </div>
      <hr />
      <div className="flex items-center space-x-2 pl-7 p-3">
        <ButtonWithCheckboxList
          name="Gender"
          icon={GitPullRequestClosed}
          options={gender}
          onFilterChange={(selectedOptions) => handleFilterChange("gender", selectedOptions)}
        />
      </div>
      <hr />
      <div className="flex items-center space-x-2 pl-7 p-3">
        <ButtonWithCheckboxList
          name="Availability"
          icon={CalendarCheck2}
          options={availability}
          onFilterChange={(selectedOptions) => handleFilterChange("availability", selectedOptions)}
        />
      </div>
      <hr />
      <div className="flex items-center space-x-2 pl-7 p-3">
        <RadioList
          name="Examination Fee"
          icon={GraduationCap}
          options={examinationFee}
          onRadioChange={(selectedOption) => handleRadioChange("examinationFee", selectedOption)}
        />
      </div>
    </div>
  );
};

export default Filter;
