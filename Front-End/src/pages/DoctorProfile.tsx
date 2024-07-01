import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import SearchBar from "../components/doctorProfile/SearchBar";
import DoctorInfo from "../components/doctorProfile/DoctorInfo";
import DoctorAbout from "../components/doctorProfile/DoctorAbout";
import SubSpecialties from "../components/doctorProfile/SubSpecialties";
import OverallRating from "../components/doctorProfile/OverallRating";
import PatientRate from "../components/doctorProfile/PatientRate";
import BookingDoctorProfile from "../components/doctorProfile/BookingDoctorProfile";
import {
  AppointmentsDoctor,
  OverallViewRating,
  useDoctorData,
  useFetchCountPatientReview,
  useReviewsOfDoctor,
} from "../hooks/useDoctorData";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorHandler from "../errors/ErrorHandler";
import { Backdrop } from "@mui/material";
import AddReview from "../components/doctorProfile/AddReview";
import DoctorDetails from '../components/doctorProfile/DoctorDetails';
import ViewMore from '../components/doctorProfile/ViewMore';
import DoctorNotAvailable from '../components/doctorProfile/DoctorNotAvailable';
import { ICountPatientReview, IReview } from '../interfaces/DoctorData';
import NoReview from '../components/doctorProfile/NoReview';
import { Appointment } from '../interfaces';


const DoctorProfile = () => {
  const [loadingViewMore, setLoadingViewMore] = useState(false);
  const { dataDoctor, loadingPage, error } = useDoctorData();
  const { reviews, limit, setLimit, total } = useReviewsOfDoctor();
  const { featuredReview, overallRating} = OverallViewRating();
  const countPatientReview=useFetchCountPatientReview();
  const [open, setOpen] = useState(loadingPage);
  const [ReRenderReviews, setReRenderReviews] = useState(reviews);
  const [TotalRating,setTotalRating]=useState(overallRating );
  const [visitors,setvisitors]=useState(0);
  const [availableDoctor,setAvailableDoctor]=useState(true);
  const {id}=useParams();
  
//---------------------------useEffect------------------------------
  useEffect(() => {
    setReRenderReviews(reviews);
  }, [reviews]);

  
  useEffect(() => {
    setTotalRating(overallRating);
  }, [overallRating]);
  
  
  useEffect(() => {
    if (countPatientReview && countPatientReview.length > 0) {
      countPatientReview.forEach(doctor => {
        if (doctor.doctorId.toString() === id) {
          setvisitors(doctor.patientCount);
        }
      });
    }
  }, [countPatientReview, id]);

  //-----------------------appointments--------------------------------
  const {appointments}=AppointmentsDoctor();

  useEffect(() => {
    if (appointments.length <= 0) {
      setAvailableDoctor(false);
    } else {
      setAvailableDoctor(true);
    }
  }, [appointments]);
    
  const groupAppointmentsByDate = (appointments: Appointment[]) => {
      return appointments.reduce(
        (groups: { [key: string]: Appointment[] }, appointment) => {
          const date = new Date(appointment.date).toDateString();
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(appointment);
          return groups;
        },
        {}
      );
    };
  //-------------------handle------------------------------------------
  const handleClose = () => {
    setOpen(false);
  };

//--------------loading component--------------------------------------
  if (loadingPage) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  //-----------------Error Component------------------------------------
  if (!dataDoctor || error) {
    return <ErrorHandler />;
  }
  
  //----------------reRender New Added  Review-------------------------
  const renderReviewNewAdded = (NewAddedReview: IReview) => {
    if(limit<=5)
      {
        setReRenderReviews(prevReviews => [...prevReviews, NewAddedReview]);
      }

      if(overallRating >0)
        {
          const  NewOverallRating=(overallRating+NewAddedReview.rating)/2;
          setTotalRating(NewOverallRating);
        }else{
          setTotalRating(NewAddedReview.rating);

        }

};

//---------------reRender Updated Review-------------------------------
 const renderOverallRatingAfterUpdate = (OverallReview:number,ReviewUpdated: IReview) => {

    setReRenderReviews((prevReviews) => {
        const index = prevReviews.findIndex(review => review._id === ReviewUpdated._id);
        
        if (index !== -1) {
            const updatedReviews = [...prevReviews];
            updatedReviews[index] = { ...updatedReviews[index], ...ReviewUpdated };
            return updatedReviews;
        }

        return prevReviews;
    });

    setTotalRating(OverallReview);

};

//---------------reRender Delete Review-------------------------------
const renderOverallRatingAfterDelete = ( overallRating: number,ReviewDelete: IReview,visitorsCount: ICountPatientReview[]
) => {
  setReRenderReviews((prevReviews) =>
    prevReviews.filter((review) => review._id !== ReviewDelete._id)
  );

  setTotalRating(overallRating);

  if (visitorsCount.length > 0) {
    setvisitors(visitorsCount[0].patientCount)
  } else {
    setvisitors(0)

  }
};
//-------------------render Patinet Review----------------------------
const renderReviews = ReRenderReviews.map((review, indx) => {   
      
  return(
    <PatientRate
      key={indx}
      rating={review.rating}
      dateReview={new Date(review.createdAt).toLocaleDateString()}
      namePatinet={review.patient.name}
      reviewComment={review.review}
      id={review._id}
      renderOverallRatingAfterUpdate={renderOverallRatingAfterUpdate}
      renderOverallRatingAfterDelete={renderOverallRatingAfterDelete}

    />
  )
});



  //------------------------Handler--------------------------------------
  const handleViewMore = async () => {
    setLoadingViewMore(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLimit(limit + 5);
    setLoadingViewMore(false);
  };
 
  //------------------- Not available doctor-------------------------------

  if(!availableDoctor)
    {
        return (
            <>
            {/* section of Search Bar */}
      <div className="hidden md:block">
        <SearchBar
          firstName={dataDoctor.firstName}
          lastName={dataDoctor.lastName}
          phoneNubmer={dataDoctor.phone}
        />
      </div>

      <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start px-4 pt-3">
        <div className="px-16 hidden lg:block">
          <p className="text-xs p-3">
            <Link to="/" className="text-blue-600">
              Vezeeta
            </Link>
            <span className="text-gray-500 text-xs">
              <span className="px-2">/</span> Doctor {dataDoctor.firstName} {dataDoctor.lastName}
            </span>
          </p>
        </div>
        <div className="w-full flex justify-between md:px-5 lg:pl-10 xl:pl-16 items-start pb-5">
          {/* section of Doctor Information */}
          <DoctorNotAvailable firstName={dataDoctor.firstName} lastName={dataDoctor.lastName}genaralSpecialization={dataDoctor.genaralSpecialization} specializes={dataDoctor.specializes}/>

        </div>
      </div>
    </>
        )
    }

  //-------------------available doctor------------------------------------------------
  return (
    <>
      {/* section of Search Bar */}
      <div className="hidden md:block">
        <SearchBar
          firstName={dataDoctor.firstName}
          lastName={dataDoctor.lastName}
          phoneNubmer={dataDoctor.phone}
        />
      </div>

      <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start px-7 pt-3">
        <div className="px-16 hidden lg:block">
          <p className="text-xs p-3">
            <Link to="/" className="text-blue-600">
              Vezeeta
            </Link>
            <span className="text-gray-500 text-xs">
              <span className="px-2">/</span> Doctor  {dataDoctor.firstName} {dataDoctor.lastName}
            </span>
          </p>
        </div>
        <div className="flex justify-between md:px-5 lg:pl-10 xl:pl-16 items-start pb-5">
          {/* section of Doctor Information */}

          <div className="pr-5 lg:w-7/12 ">
            <DoctorInfo
              firstName={dataDoctor.firstName}
              lastName={dataDoctor.lastName}              view={dataDoctor.views}
              genaralSpecialization={dataDoctor.genaralSpecialization}
              specializes={dataDoctor.specializes}
              imageProfile={dataDoctor.image}
              numberOfReviews={visitors}
              overallReview={TotalRating}
              firstTopReview={featuredReview}
            />
            {/* Section Of Booking in large  small Screen */}
            <div className=" lg:hidden">
              <BookingDoctorProfile
                Fees={dataDoctor.fees}
                WaitingTime={dataDoctor.waitingTime}
                address={dataDoctor.address}
                groupedAppointments={groupAppointmentsByDate(appointments)}

              />
            </div>

            <div className="md:hidden">
              <DoctorDetails
                 firstName={dataDoctor.firstName}
                 lastName={dataDoctor.lastName}
                address={dataDoctor.address}
                Fees={dataDoctor.fees}
                WaitingTime={dataDoctor.waitingTime}
                overRating={TotalRating}
              />
            </div>
            <DoctorAbout about={dataDoctor.about} />
            <SubSpecialties specializes={dataDoctor.specializes} />

            <OverallRating overallRating={TotalRating}  numberOfReviews={visitors}>
            <AddReview  renderReviewNewAdded={renderReviewNewAdded} />
            </OverallRating >

            <div>
              {/* Render reviews of patient */}
              
              {ReRenderReviews.length > 0 ? renderReviews : <NoReview/>}


              <div className="bg-white ">
                {loadingViewMore && <CircularProgress />}
              </div>

              {limit < total && <ViewMore onClick={handleViewMore} />}
            </div>
          </div>

          {/* Section of Booking in large screen */}
          <div className=" me-10 hidden lg:w-5/12 lg:block sticky top-0">
            <BookingDoctorProfile

              Fees={dataDoctor.fees}
              WaitingTime={dataDoctor.waitingTime}
              address={dataDoctor.address}
              groupedAppointments={groupAppointmentsByDate(appointments)}

            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
