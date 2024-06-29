import { FC } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps{
  specializes:string[]
}

const SubSpecialties:FC<IProps> = ({specializes}) => {


  const renderspecializes = specializes.map((specialize, indx) => (
   
    <div key={indx} className=" p-2 border border-blue-600  text-blue-700 font-semibold rounded-md">
    {specialize}
</div>
));
  return (
    <div className="w-full flex rounded-lg border-t-2 md:hidden lg:hidden">
      <Accordion className="w-full">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
        >
          <Typography className="text-gray-500"> 
            Sub-Specialties
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row w-full gap-3">
              {renderspecializes}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SubSpecialties;
