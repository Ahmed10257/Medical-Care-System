import { FC } from "react";
import ShowMoreText from "react-show-more-text";
import SpecDoctor from "./SpecDoctor";
import { Avatar } from "@mui/material";

interface IProps {
    doctorName: string
    genaralSpecialization: string
    specializes: string[]
}

const DoctorNotAvailable: FC<IProps> = ({ doctorName, genaralSpecialization, specializes, }) => {
   
    const executeOnClick = (isExpanded: boolean) => {
        console.log(isExpanded);
    };

    return (
        <div className="bg-white flex justify-between items-center  rounded-lg  gap-5 p-5 text-start">
            <div className="w-2/12 px-5 pt-5">
                <div className="md:hidden lg:hidden">
                <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/15799/15799598.png " variant="square"   sx={{ width: 80, height: 80 }} />
                </div>

                <div className="hidden md:block lg:block">
            <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/15799/15799598.png "    sx={{ width: 120, height: 120 }} />
                </div>

            </div>

            <div className="w-6/12">
                <div className="flex justify-between">
                    <div className=" flex flex-col gap-1  ">
                        <p className="text-gray-500 font-semibold  text-start  text-balance md:lg:text-2xl pt-5">
                        Doctor {doctorName}
                        </p>
                


                    </div>
                </div>

                <p className="text-start pt-5 text-sm md:text-lg text-gray-500 text-balance font-semibold hidden  lg:block">
                    {genaralSpecialization}
                   
                </p>

                <ShowMoreText
                    lines={2}
                    more="More"
                    less="Less"
                    className="content-css text-start pt-5 font-semibold text-sm md:text-lg text-gray-500 text-balance font-semibol  lg:hidden"
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

            </div>

            <div className="text-sm text-start px-5 w-4/12 flex justify-center items-center">

                <p  className="text-sm text-start bg-slate-100 p-5 text-gray-600">
                    Doctor is not available for booking 
                </p>
            </div>
        </div>
    );
};



export default DoctorNotAvailable;