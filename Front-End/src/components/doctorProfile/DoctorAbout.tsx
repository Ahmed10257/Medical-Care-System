import { FC } from "react";
import { UserRound } from 'lucide-react';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

interface IProps {
    about: string;
}

const DoctorAbout: FC<IProps> = ({ about }) => {
    return (
        <>

        <div className=" flex  rounded-lg md:hidden lg:hidden">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                >
                    <Typography className="flex gap-3 text-gray-500"> 
                         About The Doctor
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {about}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            </div>
        <div className="bg-white  gap-4 p-8 rounded-lg mb-4 hidden md:flex lg:flex">
            <div className="">
                <UserRound color="blue" />
            </div>
            <div className="flex flex-col items-start">
                <div className="text-gray-600 font-bold pb-5 text-base">
                    About The Doctor
                </div>
                <div className="text-start text-gray-500 text-sm">
                    {about}
                </div>
            </div>
        </div>
        </>
    );
}

export default DoctorAbout;
