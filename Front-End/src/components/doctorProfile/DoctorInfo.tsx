import { FC } from "react";
import './style.css';
import ShowMoreText from "react-show-more-text";
import TopRate from "./TopRate";
import SpecDoctor from "./SpecDoctor";
import RatingStar from "./RatingStar";

interface IProps {
    doctorName:string
    view:number
    genaralSpecialization:string
    specializes:string[]
    imageProfile:string
    overallReview:number
    numberOfReviews:number
}

const DoctorInfo: FC<IProps> = ({doctorName,view,genaralSpecialization,specializes,imageProfile,numberOfReviews,overallReview}) => {
    const executeOnClick = (isExpanded: boolean) => {
        console.log(isExpanded);
    };

    console.log(imageProfile);
    
    // const specializes: string[] = [
    //     "TROPICAL Medicine",
    //     "Gastroenterologist Specialized in Adult Gastroenterology and Endoscopy",
    //     "Adult Internal Medicine",
    //     "Adult Hepatology"
    // ];

    return (
        <div className="bg-white grid grid-cols-4 rounded-lg p-3 mb-4 gap-4">
            <div className="col-span-1 p-5">
                <img
                    src="https://t4.ftcdn.net/jpg/03/20/52/31/360_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg"
                    className="circle-image"
                    alt="profile"
                />
            </div>

            <div className="col-span-3">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-balance md:lg:text-2xl pt-5">
                        Doctor {doctorName}
                    </p>
                    <p className="text-gray-500 text-balance pt-5 me-10 hidden md:block lg:block">
                        {view} View(s)
                    </p>
                </div>

                <p className="text-start pt-5 text-sm md:text-lg text-gray-500 text-balance font-semibold">
                    {genaralSpecialization}
                </p>

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
                       
                        <RatingStar rating={overallReview}/>

                        <p className="text-xs text-gray-500">
                            Overall Rating From {numberOfReviews} Visitors
                            <a href="#" className="dark:hover:underline px-3 text-blue-500">
                                Show all reviews
                            </a>
                        </p>
                    </div>

                    <div className="pt-5 me-16">
                        <TopRate />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorInfo;
