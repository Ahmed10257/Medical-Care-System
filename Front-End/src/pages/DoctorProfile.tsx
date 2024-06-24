import { Link, useParams } from "react-router-dom";
import SearchBar from "../components/doctorProfile/SearchBar";
import DoctorInfo from "../components/doctorProfile/DoctorInfo";
import DoctorAbout from "../components/doctorProfile/DoctorAbout";
import PatientSatisfaction from "../components/doctorProfile/PatientSatisfaction";
import OverallRating from "../components/doctorProfile/OverallRating";
import PatientRate from "../components/doctorProfile/PatientRate";
import BookingDoctorProfile from "../components/doctorProfile/BookingDoctorProfile";
import axios from 'axios';
import { useEffect, useState } from "react";
import { IDoctor } from "../interfaces";

interface IProps {}

const DoctorProfile = (props: IProps) => {
    console.log(props);
    
    const [dataDoctor, setDataDoctor] = useState<IDoctor>({
    name: '',
  phone: -1,
  email: '',
  password: '',
  about: '',
  address: {
    city: '',
    country: '',
    region: -1
  },
  birthdate: '',
  fees: -1,
  genaralSpecialization: '',
  gender: '',
  image: '',
  isDoctor: true,
  specializes: [],
  views: 1000
    });
    const { id } = useParams();
    
    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/doctor/${id}`);
                setDataDoctor(response.data);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            }
        };

        fetchDoctorData();
    }, [id]);

    

    
        console.log(dataDoctor);
        
    if (!dataDoctor) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="hidden md:block">
                <SearchBar doctorName={dataDoctor.name}  phoneNubmer={dataDoctor.phone} />
            </div>
            <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start pt-3">
                <div className="px-16 hidden lg:block">
                    <p className="text-xs p-3">
                        <Link to="/" className="text-blue-600">Vezeeta</Link>
                        <span className="text-gray-500 text-xs">
                            <span className="px-2">/</span> Doctor {dataDoctor.name}
                        </span>
                    </p>
                </div>
                <div className="w-full flex justify-center items-start px-16">
                    <div className="">
                        <DoctorInfo doctorName={dataDoctor.name} view={dataDoctor.views} 
                        genaralSpecialization={dataDoctor.genaralSpecialization} 
                        specializes={dataDoctor.specializes} imageProfile={dataDoctor.image}
                        />
                        <div className="lg:hidden">
                            <BookingDoctorProfile  />
                        </div>
                        <DoctorAbout about={dataDoctor.about} />
                        <PatientSatisfaction />
                        <OverallRating />
                        <div>
                            <PatientRate />
                            <PatientRate />
                            <PatientRate />
                            <PatientRate />
                        </div>
                    </div>
                    <div className="w-full mx-4 hidden lg:block">
                        <BookingDoctorProfile />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorProfile;
