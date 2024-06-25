import { FC } from "react"
import { Star } from 'lucide-react';
import RatingStar from "./RatingStar";
import MyModal from "./AddReview";

interface IProps{
    overallRating:number

}
const OverallRating:FC<IProps>= ({overallRating}) => {
  return (
    <div id="patients-reviews" className="bg-white flex gap-4 p-8 rounded-t-lg  border-b-slate-100 border-b-8   ">
            <div className="">
               <Star color="blue"/>
            </div>

            <div className=" w-full flex flex-col items-center">
                <div className="text-gray-600 font-bold pb-5 text-base">
                Patients’ Reviews :
                </div>

                <div className="  w-full p-4  flex flex-col justify-center items-center  text-gray-500 text-sm">
                        <RatingStar  rating={overallRating}/>
                     <div className="mt-4">
                     <p className="font-bold text-lg">Overall Rating</p>
                     <p className=""> From 4730 Visitors</p>
                     </div>
                </div>

                <div className="  w-full p-4  flex flex-row justify-evenly items-center  text-gray-500 text-sm">
                    <div >
                    <RatingStar  rating={overallRating} size={23}/>
                        <p className="mt-3">Assistant Rating</p>
                    </div>
                    <div>
                    <RatingStar  rating={4}/>
                    <p className="mt-3">Clinic Rating</p>
                    </div>
                    <div>
                        <span className="bg-blue-600 text-white rounded-md p-2 px-2 "><span className="font-bold px-1">5</span>/5</span>
                        <p className="mt-4">Doctor Rating</p>
                    </div>
                </div>
                <MyModal/>
                
            </div>
        </div>
  )
}

export default OverallRating