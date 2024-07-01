import { FC, useState } from 'react';
import { SquareUserRound, CalendarDays, LogOut } from 'lucide-react';
import './style.css'
import { Link } from 'react-router-dom';
import { IPatient } from '../../interfaces/DoctorData';

interface IProps {
  patinetData: IPatient;
}

const DropDown: FC<IProps> = ({ patinetData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <a onClick={toggleDropdown} className={`cursor-pointer block py-1 px-1 mx-1 text-white md:bg-transparent md:text-blue-700 md:p-0 dark:text-white `}>
        <span className={`mx-2 dropdown ${isDropdownOpen ? 'dropdown-open' : ''}`}>{patinetData.name.toUpperCase()}</span>
      </a>
      {isDropdownOpen && (
        <ul
          role="menu"
          data-popover="menu"
          data-popover-placement="bottom"
          className="absolute z-10 min-w-[150px] mt-8 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 text-blue-700 hover:bg-blue-200"
          >
            <div className='flex space-x-1 items-center'>
              <SquareUserRound />
              <span>
                <Link to="patient-profile/myprofile">
                  My profile
                </Link>
              </span>
            </div>
          </li>
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 text-blue-700 hover:bg-blue-200"
          >
            <div className='flex space-x-1 items-center'>
              <CalendarDays />
              <span>
                <Link to="patient-profile/appointments">
                  My Appointments
                </Link>
              </span>
            </div>
          </li>
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 text-blue-700 hover:bg-blue-200"
          >
            <div className='flex space-x-1 items-center'>
              <LogOut />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default DropDown;
