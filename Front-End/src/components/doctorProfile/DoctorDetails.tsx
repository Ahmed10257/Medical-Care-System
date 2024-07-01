import { FC } from "react"
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { TbClockHour3 } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { Address } from "../../interfaces/DoctorData";
import Rating from '@mui/material/Rating';

interface IProps{
    firstName:string
    lastName:string
    Fees:number
    WaitingTime:number
    address:Address
    overRating:number
}
const DoctorDetails:FC<IProps>= ({firstName,lastName,address,WaitingTime,Fees,overRating}) => {
    
  return (
    <div className="bg-white  flex flex-col rounded-lg  mb-4 ">
            
            <div className="text-sm  text-start font-semibold bg-white p-2 text-gray-500 border-b-2 ">
            Doctor {firstName} {lastName} HCC's details
            </div>

            <div className=" justify-evenly items-center  border-b-2  p-3 gap-5 flex">
                <div className="mx-2 flex gap-5 justify-center   items-center">
                    <FaMoneyCheckDollar color="blue" size={30} />
                    <p className="text-sm text-start font-semibold text-gray-400"> <span className="text-gray-500 font-bold px-1">{Fees} EGP <br/></span> Consultation fees</p>
                </div>

                <div className="mx-3 flex   gap-5 items-center">
                <TbClockHour3 color="blue" size={30} />
                    <p className="text-xs text-start text-gray-500 ">Waiting Time  <br/> {WaitingTime }Minutes</p>
                </div>
            </div>

            <div className="border-b-2 p-4  md:flex flex">
                <div>
                <IoLocationOutline color="blue" size={20} />

                </div>
                <div className="flex flex-col text-start px-1">
                    <p className="text-sm text-gray-500">
                    {address.region},{address.city},{address.country}</p>

                    <p  className="text-sm text-gray-500">Book now to receive the clinic’s address details and phone number
                    </p>

                </div>
            </div>
        
            <div className="flex items-center justify-evenly border-b-2  text-sm text-gray-800 p-3 bottom-2">
            Patients’ Reviews :

             <div>
             <Rating name="read-only" value={overRating}  precision={0.5}  readOnly />

             </div>
             <div>
             <span className="bg-blue-600 text-white rounded-md p-2 px-2 "><span className="font-bold px-1">{overRating.toFixed(1)}</span>/5</span>

             </div>
            </div>


        </div>
  )
}

export default DoctorDetails;