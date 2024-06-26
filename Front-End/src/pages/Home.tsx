import Carousel from "../components/LandingPage/Carousel";
import LongCard from "../components/LandingPage/LongCard";
import Offers from "../components/LandingPage/Offers";
import LittleCard from "../components/LandingPage/LittleCard";
import { HeartPulse } from "lucide-react";
import SmallCard from "../components/LandingPage/SmallCard";
import { BriefcaseMedical, Hospital, Stethoscope } from "lucide-react";
import LongCardV2 from "../components/LandingPage/LongCardV2";
import OffersV2 from "../components/LandingPage/OffersV2";
import BigCard from "../components/LandingPage/BigCard";
import SearchBar from "../components/SearchBar/SearchBar";

interface IProps {}
const Home = (props: IProps) => {
  console.log(props);
  return (
    <div>
      <div className="relative">
        <Carousel />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-4/5 md:w-2/5">
          <SearchBar />
        </div>
      </div>
      <div>
        <div className="bg-gray-200 w-full">
          <div className="container mx-auto w-11/12 md:w-2/3 p-8">
            <h5 className="text-left font-bold text-gray-500 text-2xl md:text-4xl">
              New Service for Better Health Care
            </h5>
            <LongCard
              imageURL="https://res.cloudinary.com/dh7osyxvl/image/upload/v1719273887/Medical%20Care%20System/pngwing.com_18_oyjgy4.png"
              title="Shamel"
              description="Save up to 70% on all medical services. The network is available only through the App - In Cairo and Giza till now."
              button="See Details"
              backgroundColor="bg-blue-400"
              buttonColor="white"
            />
            <LongCard
              imageURL="https://www.patientcalls.com/wp-content/uploads/healthcare-coverage-for-patient-calls.jpg"
              title="North"
              description="North, your way to practice peace."
              button="Explore North"
              backgroundColor="bg-white"
              buttonColor="blue-400"
            />
            <LongCardV2
              imageURL="https://via.placeholder.com/800x400?text=3"
              title="Have a Medical Question?"
              description="Submit your medical question and get an answer from a specialized doctor."
              button="Ask Now"
              backgroundColor="bg-white"
              buttonColor="blue-400"
              textColor="black"
            />
            <LongCardV2
              imageURL="https://via.placeholder.com/800x400?text=3"
              title="Pharmacy"
              description="Get your medicine delivered to your doorstep."
              button="Place Order"
              backgroundColor="bg-sky-600"
              buttonColor="white"
              textColor="white"
            />
            <div className="grid grid-cols-1 xl:flex lg:w-full gap-4 md:gap-9 mt-4">
              <SmallCard
                imageURL="https://forefacts.com/images/tele-consultation/tele-consultation-header.webp"
                title="Teleconsultation"
                description="Schedule a voice or video call with a specialized doctor."
                link="Book a Call"
              />
              <SmallCard
                imageURL="https://www.sawaaidhct.com/wp-content/uploads/2021/08/doctor-home-visit-service-1.png"
                title="Home Visit"
                description="Choose the specialty, and the doctor will visit you at home."
                link="Book a Visit"
              />
            </div>
          </div>
        </div>
        <div className="bg-white w-full">
          <div className="container mx-auto py-3 w-11/12 ">
            <h5 className="text-left font-bold text-gray-500 text-2xl md:text-3xl my-3">
              Choose from top offers
            </h5>
            <OffersV2 />
          </div>
        </div>
        <div className="bg-gray-200 w-full">
          <div className="container mx-auto py-3 w-11/12">
            <h5 className="text-left font-bold text-gray-500 text-2xl my-3">
              Book from top specialties
            </h5>
            <Offers />
          </div>
        </div>
        <div className="bg-white w-full py-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between w-11/12   ">
            <LittleCard
              type="card"
              header="header"
              title="title"
              icon={<Stethoscope />}
              message="All your healthcare needs"
              description="Search and book a clinic visit, home visit, or a teleconsultation. Order your medicine and book a service or operation."
            />
            <LittleCard
              type="card"
              header="header"
              title="title"
              icon={<HeartPulse />}
              message="Verified patient reviews"
              description="Doctor ratings are from patients who booked and visited the doctor through Vezeeta."
            />
            <LittleCard
              type="card"
              header="header"
              title="title"
              icon={<BriefcaseMedical />}
              message="Your booking is confirmed"
              description="Your booking is automatically confirmed, as the doctor specifies his working hours and is notified of the booking details."
            />
            <LittleCard
              type="card"
              header="header"
              title="title"
              icon={<Hospital />}
              message="Book for free, and pay in the clinic"
              description="The consultation fees stated on Vezeeta are the actual doctor's fees with no extra charges."
            />
          </div>
        </div>
        <div className="bg-white w-full py-6">
          <div className="container mx-auto w-11/12 md:w-2/3">
            <BigCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
