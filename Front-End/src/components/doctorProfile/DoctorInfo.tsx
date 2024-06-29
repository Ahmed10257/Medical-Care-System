import { FC } from "react";
import ShowMoreText from "react-show-more-text";
import TopRate from "./TopRate";
import SpecDoctor from "./SpecDoctor";
import { IReview } from "../../interfaces/DoctorData";
import { Avatar } from "@mui/material";
import Rating from '@mui/material/Rating';

interface IProps {
    doctorName: string
    view: number
    genaralSpecialization: string
    specializes: string[]
    imageProfile: string
    overallReview: number
    numberOfReviews: number
    firstTopReview?: IReview | null 
}

const DoctorInfo: FC<IProps> = ({ doctorName, view, genaralSpecialization, specializes, imageProfile, numberOfReviews, overallReview, firstTopReview }) => {
    const executeOnClick = (isExpanded: boolean) => {
        console.log(isExpanded);
    };

  
    return (
        <div className="bg-white grid grid-cols-4 rounded-lg p-3 mb-4 gap-4">
            <div className="col-span-1 px-5 pt-5">
                <div className="md:hidden lg:hidden ">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="square"   sx={{ width: 60, height: 60 }} />
                </div>

                <div className="hidden md:block lg:block ">
                    
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"    sx={{ width: 120, height: 120 }} />
                </div>

            </div>

            <div className="col-span-3">
                <div className="flex justify-between">
                    <div className=" flex flex-col gap-1  ">
                        <p className="text-gray-500 font-semibold  text-start  text-balance md:lg:text-2xl pt-5">
                        Doctor {doctorName}
                        </p>
                        <div className="md:hidden lg:hidden text-start">
                        <Rating name="half-rating-read" value={overallReview} precision={0.5} readOnly />
                        </div>
                        <p className="text-blue-700  md:hidden lg:hidden"> 
                        Overall Rating From {numberOfReviews} Visitors
                        </p>
                



                    </div>
                    <p className="text-gray-500 text-balance pt-5 me-10 hidden md:block lg:block">
                        {view} View(s)
                    </p>
                </div>

                <p className="text-start pt-5 text-sm md:text-lg text-gray-500 text-balance font-semibold hidden md:block lg:block">
                    {genaralSpecialization}
                   
                </p>

                <ShowMoreText
                    lines={2}
                    more="More"
                    less="Less"
                    className="content-css text-start pt-5 font-semibold text-sm md:text-lg text-gray-500 text-balance font-semibol md:hidden lg:hidden"
                    anchorClass="show-more-less-clickable"
                    onClick={executeOnClick}
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    {genaralSpecialization}
                </ShowMoreText>
           


                <ShowMoreText
                    lines={3}
                    more="More"
                    less="Less"
                    className="content-css pt-3 text-start text-sm text-blue-500 cursor-pointer hidden md:block lg:block"
                    anchorClass="show-more-less-clickable"
                    onClick={executeOnClick}
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    <SpecDoctor specializes={specializes} />
                </ShowMoreText>

                <div className="flex-col hidden md:flex lg:flex">
                    <div className="text-sm pt-5 flex gap-14 items-center">
                        <Rating name="read-only" value={overallReview}  precision={0.5}  readOnly />

                        <p className="text-xs text-gray-500">
                            Overall Rating From {numberOfReviews} Visitors
                            <a href="#patients-reviews" className="dark:hover:underline px-3 text-blue-500">
                                Show all reviews
                            </a>
                        </p>
                    </div>
                    {firstTopReview && (
                        <div className="pt-5 me-16">
                            <TopRate rating={firstTopReview.rating} nameReviwer={firstTopReview.patient.name}
                                reviewComment={firstTopReview.review} date={firstTopReview.createdAt} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorInfo;
