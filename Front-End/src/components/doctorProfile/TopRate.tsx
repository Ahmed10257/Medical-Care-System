import { FC } from "react"
import { RollerCoaster } from 'lucide-react';
import RatingStar from "./RatingStar";

interface IProps{
    rating:number
    reviewComment:string
    nameReviwer:string
    date:string
}
const TopRate:FC<IProps>= ({rating,nameReviwer,reviewComment,date}) => {
  return (
        <>
        <div className="bg-slate-300 w-full rounded-bl-3xl rounded-tr-3xl flex flex-col">
            <div className=" w-full flex justify-between items-start pt-5">
                <div className="px-5"> 
                <RollerCoaster fill="blue" color="blue" />

                </div>
                <div className="me-16 text-gray-600">
                    <p className="">
                    {reviewComment}
                    </p>
                </div>
            </div>

            <div className=" w-full flex justify-around pt-5 pb-5 ">
                <div > 
                <RatingStar rating={rating}/>


                </div>
                <div className="me-16 text-gray-600 flex gap-2 text-xs">
                    <p>
                        {nameReviwer}
                    </p>
                    <p>
                    {date}
                    </p>
                </div>
            </div>
        </div>
        </>
  )
}

export default TopRate