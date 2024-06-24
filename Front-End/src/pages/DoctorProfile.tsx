import { Link } from "react-router-dom";
import SearchBar from "../components/doctorProfile/SearchBar";
import DoctorInfo from "../components/doctorProfile/DoctorInfo";
import DoctorAbout from "../components/doctorProfile/DoctorAbout";
import PatientSatisfaction from "../components/doctorProfile/PatientSatisfaction";
import OverallRating from "../components/doctorProfile/OverallRating";
import PatientRate from "../components/doctorProfile/PatientRate";
import BookingDoctorProfile from "../components/doctorProfile/BookingDoctorProfile";
import {useDoctorData,useReviewsOfDoctor} from "../hooks/useDoctorData";

interface IProps {}

const DoctorProfile = (props: IProps) => {
    console.log(props);

    const { dataDoctor, loading, error } = useDoctorData();
    const {reviews,overallRating }=useReviewsOfDoctor();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!dataDoctor) {
        return <div>No data available</div>;
    }

    console.log(overallRating);
    
    //render
    const renderReviews = reviews.map((review, indx) => (
        <PatientRate
            key={indx}
            rating={review.rating}
            dateReview={new Date(review.createdAt).toLocaleDateString()}
            namePatinet={review.patient.name}
            reviewComment={review.review}
        />
    ));
    return (
        <>
            <div className="hidden md:block">
                <SearchBar doctorName={dataDoctor.name} phoneNubmer={dataDoctor.phone} />
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
                            numberOfReviews={reviews.length} overallReview={overallRating}
                        />
                        <div className="lg:hidden">
                            <BookingDoctorProfile  />
                        </div>
                        <DoctorAbout about={dataDoctor.about} />
                        <PatientSatisfaction />
                        <OverallRating  overallRating={overallRating}  />
                        <div>
                          {renderReviews}
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
