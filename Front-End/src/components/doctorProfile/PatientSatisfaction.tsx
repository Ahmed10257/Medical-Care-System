import { FC } from "react"
import { Users } from 'lucide-react';

interface IProps{

}
const PatientSatisfaction:FC<IProps>= () => {
  return (
    <div className="bg-white flex gap-4 p-8 rounded-lg  mb-4 ">
            <div className="">
               <Users color="blue"/>
            </div>

            <div className="flex flex-col items-start">
                <div className="text-gray-600 font-bold pb-5 text-base">
                Patient Satisfaction
                </div>

                
            </div>
        </div>
  )
}

export default PatientSatisfaction