import { FC } from "react"
import { RollerCoaster } from 'lucide-react';
import RatingStar from "./RatingStar";

interface IProps{

}
const TopRate:FC<IProps>= () => {
  return (
        <>
        <div className="bg-slate-300 w-full rounded-bl-3xl rounded-tr-3xl flex flex-col">
            <div className=" w-full flex justify-between items-start pt-5">
                <div className="px-5"> 
                <RollerCoaster fill="blue" color="blue" />

                </div>
                <div className="me-16 text-gray-600">
                    <p>
                    الدكتور كويس
                    </p>
                </div>
            </div>

            <div className=" w-full flex justify-around pt-5 pb-5 ">
                <div > 
                <RatingStar rating={2.3}/>


                </div>
                <div className="me-16 text-gray-600 flex gap-2 text-xs">
                    <p>
                        .مازن ع
                    </p>
                    <p>
                    Tuesday, 17 November 2015
                    </p>
                </div>
            </div>
        </div>
        </>
  )
}

export default TopRate