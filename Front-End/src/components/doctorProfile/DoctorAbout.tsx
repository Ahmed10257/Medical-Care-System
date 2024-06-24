import { FC } from "react"
import { UserRound } from 'lucide-react';

interface IProps{
    about:string
}
const DoctorAbout:FC<IProps>= ({about}) => {
  return (
            <div className="bg-white flex gap-4 p-8 rounded-lg  mb-4 ">
            <div className="">
               <UserRound color="blue"/>
            </div>

            <div className="flex flex-col items-start">
                <div className="text-gray-600 font-bold pb-5 text-base">
                About The Doctor
                </div>

                <div className="text-start text-gray-500 text-sm">
                {about}
                </div>
            </div>
        </div>
  )
}

export default DoctorAbout