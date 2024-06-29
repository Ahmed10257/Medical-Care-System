import { FC, } from "react"
import  Rating  from "@mui/material/Rating"
import ModalEditReview from "./EditReview"
import { ICountPatientReview, IReview } from "../../interfaces/DoctorData"
import DeleteModal from "./DeleteReview"

interface IProps{
  rating:number
  namePatinet:string
  reviewComment:string
  dateReview:string
  id:string
  renderOverallRatingAfterUpdate: (OverallReview:number,ReviewUpdated:IReview) => void;
  renderOverallRatingAfterDelete: (OverallReview:number,DeletReview:IReview,visitorsCount:ICountPatientReview[]) => void;

}
const PatientRate:FC<IProps>= ({rating,dateReview,namePatinet,reviewComment,id,renderOverallRatingAfterUpdate,renderOverallRatingAfterDelete}) => {
  const overallRatingAfterUpdate = (verallReview:number,ReviewUpdated:IReview) => {
    renderOverallRatingAfterUpdate(verallReview,ReviewUpdated);
    
  };
  const overallRatingAfterDelete = (OverallReview:number,DeletReview:IReview,visitorsCount:ICountPatientReview[]) => {
    renderOverallRatingAfterDelete(OverallReview,DeletReview,visitorsCount);
    
  };
  return (
    <div className="bg-white flex  justify-between  items-center border-b-2   ">
            <div className="flex items-start  p-6  flex-col">
            <Rating name="read-only" value={rating}  precision={0.5}  readOnly />
            <p className="text-sm pt-3 text-gray-500">Overall Rating</p>
            <p className="text-sm pt-5 text-gray-500">'{reviewComment}'</p>
            <p  className="text-xs pt-5 text-gray-500">{namePatinet}</p>
            <p  className="text-xs pt-1 text-gray-500">{dateReview}</p>
            <div className="flex justify-center items-center  ">
            <DeleteModal id_review={id}  renderReviewOverallRating={overallRatingAfterDelete}/>
            <ModalEditReview id_review={id}  renderReviewOverallRating={overallRatingAfterUpdate}/>
            </div>
            </div>

            <div className="me-16">
                <div>
                <span className="bg-blue-600 text-white rounded-md  text-1xl font-semibold p-2 px-3 ">{rating}</span>
                <p className="mt-4 text-gray-500">Doctor Rating</p>
               </div>
             

            </div>
            

        
     </div>
  )
}

export default PatientRate