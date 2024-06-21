import { FilterIcon } from "lucide-react";
import ButtonWithCheckboxList from "../dropDownList/DropList";
import { GraduationCap } from "lucide-react";
import { GitPullRequestClosed } from "lucide-react";
import { CalendarCheck2 } from "lucide-react";
import { Stethoscope } from 'lucide-react';
import { useState } from "react";
import { FilterProps } from "../../../types/filterDoctor";

const title = ["Professor", "Lecturer", "Consultant", "Specialist"];
const gender = ["Male", "Female"];
const availability = ["Any Day", "Today", "Tomorrow"];
const entity = ["Hospital", "Clinic"];

const Filter = ({ onFilterChange }: FilterProps) => {
  const [, setSelectedFilters] = useState({
    title: [],
    gender: [],
    availability: [],
    entity: [],
  });

  const handleFilterChange = (filterName: string, selectedOptions: string[]) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedOptions,
    }));
    onFilterChange(filterName, selectedOptions);
  };

  return (
    <div className="w-48 rounded-3xl border">
      <div className="flex m-10 mb-0 ml-0 mt-0 pl-7 bg-blue-500 w-full h-10 items-center rounded-t-3xl text-white">
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
        <ButtonWithCheckboxList
          name="Entity"
          icon={Stethoscope}
          options={entity}
          onFilterChange={(selectedOptions) => handleFilterChange("entity", selectedOptions)}
        />
      </div>
    </div>
  );
};

export default Filter;
