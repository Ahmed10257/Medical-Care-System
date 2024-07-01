import { FC } from "react"
import { Phone } from 'lucide-react';
import SearchBar from "../SearchBar/SearchBar"
interface IProps{
    firstName:string
    lastName:string
    phoneNubmer:number
}
const TopBar:FC<IProps>= ({firstName,lastName,phoneNubmer}) => {
  return (
    <>
    <div className="px-16 pt-4 w-full gap-2 flex flex-col justify-start items-start bg-gray-100 ">
            <p className="text-gray-500 font-extrabold text-xl">Book now with Doctor {firstName} {lastName}</p>
            <p className="text-gray-500 font-normal text-base">Book online or call <Phone fill="red" color="red" size={18} className="inline "/> <span className="font-bold">{phoneNubmer}</span></p>
            <p className="text-gray-500 font-normal text-bas">15000 Doctors - 9000 Professors and Consultants - More than 40 Specialties</p>
            <span className="block w-full ">
              <SearchBar />
            </span>

    </div>
    </>
  )
}

export default TopBar