 import { FC, useState } from "react"
import { PiMoneyWavy,PiLetterCircleVThin ,PiCircleHalfFill} from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import { Address } from "../../interfaces/DoctorData";
import { Appointment } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight
  } from '@fortawesome/free-solid-svg-icons';
import AppointmentCard from "../AppointmentCard";


interface IProps{
    Fees:number
    WaitingTime:number
    address:Address
    groupedAppointments: { [key: string]: Appointment[] };

}
const BookingDoctorProfile:FC<IProps>= ({Fees,WaitingTime,address,groupedAppointments}) => {

   

   const {id}=useParams<string>();   
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
    
      const handleNext = () => {
        if (currentIndex < Object.keys(groupedAppointments).length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      const handleBook = (appointmentId: string) => {
        console.log("dddsadsaasdd",appointmentId);
        
        navigate(`/book/${id}/${appointmentId}`);
      };
    
      const dates = Object.keys(groupedAppointments);

  return (
    <div className="bg-white  flex flex-col rounded-lg  mb-4 ">
            <div className="w-full text-center text-sm p-1 bg-blue-600 text-white rounded-t-md hidden  lg:block">
            Booking Information
            </div>
            
            <div className="text-sm bg-white p-2 text-gray-500 border-b-2 hidden md:block lg:block">
            <p className="pb-1 pt-1">Book</p>
            <p>Examination</p>
            </div>

            <div className=" justify-center items-center  border-b-2  p-3 gap-5 hidden md:flex lg:flex">
                <div className="mx-2 flex gap-5 justify-center  flex-col items-center">
                    <PiMoneyWavy color="blue" size={30} />
                    <p className="text-xs text-start text-gray-400">Fees <span className="text-gray-500 font-bold px-1">{Fees} EGP</span></p>
                </div>

                <div className="mx-3 flex flex-col  gap-5 items-center">
                    <PiLetterCircleVThin color="#FFB624" size={35} />
                    <p  className="text-xs text-gray-500 ">You’ll earn <span className="text-green-600 px-1">350 points</span></p>
                </div>
                <div className="mx-3 flex flex-col  gap-5 items-center">
                <PiCircleHalfFill color="blue" size={30} />
                    <p className="text-xs text-start text-blue-600 ">Waiting Time : {WaitingTime} Minutes</p>
                </div>
            </div>

            <div className="border-b-2 p-4 hidden md:flex lg:flex">
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
            <div className="flex  items-center justify-start md:justify-center lg:justify-center  font-semibold text-lg text-gray-800 p-3">
            Choose your appointment
            </div>

            <div className="flex  bg-gray-100 items-center justify-center">

                  <button
                        onClick={handlePrev}
                        className={`bg-blue-500 text-white px-3 py-1 rounded-full ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentIndex === 0}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    {dates.slice(currentIndex, currentIndex + 3).map((date) => (
                        <div
                        key={date}
                        className="flex flex-col items-center  p-3 text-sm rounded-md  shadow-md-top shadow-md-left shadow-md-right w-40  md:w-auto md:h-auto"
                        >
                        <div className="date  bg-blue-600 text-white w-full  rounded-t-md p-2 text-center text-md ">
                            {new Date(date).toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            })}
                        </div>

                        <div className="w-full h-full bg-white ">
                        <AppointmentCard
                            appointments={groupedAppointments[date]}
                            onBook={handleBook}
                        />
                        </div>
                    
                        </div>
                    ))}

                   
                    <button
                        onClick={handleNext}
                        className={`bg-blue-500 text-white px-3 py-1 rounded-full ${currentIndex >= dates.length - 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentIndex >= dates.length - 3}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                 
            </div>

            <div className="flex items-center justify-center  border-b-2  text-sm text-gray-800 p-3 bottom-2">
            Reservation required, first-come, first-served
            </div>

            <div className="flex items-center justify-center   text-sm text-gray-800 p-5 bottom-2">

            <div className="px-3">
            <LuCalendarClock color="green" size={50}/>
            </div>

            <div>
                <p className="p-1">Book online, Pay at the clinic!</p>
                <p>Doctor requires reservation!</p>
            </div>
            </div>


        </div>
  )
}

export default BookingDoctorProfile