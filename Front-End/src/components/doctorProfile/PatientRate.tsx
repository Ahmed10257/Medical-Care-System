import { FC } from "react"
import RatingStar from "./RatingStar"

interface IProps{
  rating:number
  namePatinet:string
  reviewComment:string
  dateReview:string

}
const PatientRate:FC<IProps>= ({rating,dateReview,namePatinet,reviewComment}) => {
  return (
    <div className="bg-white flex  justify-between  items-center p-6  border-b-2   ">
            <div className="flex items-start  flex-col">
            <RatingStar  rating={rating} size={18}/>
            <p className="text-sm pt-3 text-gray-500">Overall Rating</p>
            <p className="text-sm pt-5 text-gray-500">'{reviewComment}'</p>
            <p  className="text-xs pt-5 text-gray-500">{namePatinet}</p>
            <p  className="text-xs pt-1 text-gray-500">{dateReview}</p>
            </div>

            <div className="me-16">
                <div>
                <span className="bg-blue-600 text-white rounded-md  text-2xl font-bold p-2 ">{rating}</span>
                <p className="mt-4 text-gray-500">Doctor Rating</p>
               </div>
            </div>

        
     </div>
  )
}

export default PatientRate