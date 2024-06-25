import { Link } from "react-router-dom";
import SearchBar from "../components/doctorProfile/SearchBar";
import DoctorInfo from "../components/doctorProfile/DoctorInfo";
import DoctorAbout from "../components/doctorProfile/DoctorAbout";
import SubSpecialties from "../components/doctorProfile/SubSpecialties";
import OverallRating from "../components/doctorProfile/OverallRating";
import PatientRate from "../components/doctorProfile/PatientRate";
import BookingDoctorProfile from "../components/doctorProfile/BookingDoctorProfile";
import { useDoctorData, useReviewsOfDoctor } from "../hooks/useDoctorData";
import ErrorHandler from "../errors/ErrorHandler";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import ViewMore from "../components/doctorProfile/ViewMore";
import DoctorDetails from "../components/doctorProfile/DoctorDetails";

interface IProps {}

const DoctorProfile = (props: IProps) => {
    console.log(props);

    const { dataDoctor, loading, error } = useDoctorData();
    const { reviews, overallRating, featuredReview } = useReviewsOfDoctor();

    const [open, setOpen] = useState(loading);

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (!dataDoctor || error) {
        return <ErrorHandler />;
    }

    console.log(reviews);

    // Render reviews
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
            <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start px-4 pt-3">
                <div className="px-16 hidden lg:block">
                    <p className="text-xs p-3">
                        <Link to="/" className="text-blue-600">Vezeeta</Link>
                        <span className="text-gray-500 text-xs">
                            <span className="px-2">/</span> Doctor {dataDoctor.name}
                        </span>
                    </p>
                </div>
                <div className="w-full flex justify-between md:px-5 lg:pl-10 xl:pl-16  items-start ">
                    <div className="pr-5">
                        <DoctorInfo
                            doctorName={dataDoctor.name}
                            view={dataDoctor.views}
                            genaralSpecialization={dataDoctor.genaralSpecialization}
                            specializes={dataDoctor.specializes}
                            imageProfile={dataDoctor.image}
                            numberOfReviews={reviews.length}
                            overallReview={overallRating}
                            firstTopReview={featuredReview}
                        />
                        <div className="lg:hidden">
                            <BookingDoctorProfile
                                Fees={dataDoctor.fees}
                                WaitingTime={dataDoctor.waitingTime}
                                address={dataDoctor.address}
                            />
                            <DoctorDetails nameDoctor={dataDoctor.name} address={dataDoctor.address}
                            Fees={dataDoctor.fees} WaitingTime={dataDoctor.waitingTime} overRating={overallRating}/>
                        </div>
                        <DoctorAbout about={dataDoctor.about} />
                        <SubSpecialties />
                        <OverallRating overallRating={overallRating} />
                        <div>
                            {renderReviews}
                            <ViewMore/>
                        </div>
                    </div>

                    <div className="w-full me-10 hidden lg:block sticky top-0   ">
                        <BookingDoctorProfile
                            Fees={dataDoctor.fees}
                            WaitingTime={dataDoctor.waitingTime}
                            address={dataDoctor.address}
                        />
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorProfile;