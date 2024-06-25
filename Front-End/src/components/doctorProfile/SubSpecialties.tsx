import { FC } from "react"
import { Accordion, AccordionDetails, AccordionSummary, ListItem, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

interface IProps{

}
const SubSpecialties:FC<IProps>= () => {
  return (
    <div className=" w-full flex  rounded-lg border-t-2 md:hidden lg:hidden">
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
        >
            <Typography className="flex gap-3 text-gray-500"> 
                 Sub-Specialties
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            <Stack direction="row" spacing={2}>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
  

          </Stack>
            </Typography>
        </AccordionDetails>
    </Accordion>
    </div>
  )
}

export default SubSpecialties;