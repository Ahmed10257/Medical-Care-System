import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { ICountPatientReview, IRating, IReview } from '../../interfaces/DoctorData';
import { MdDeleteForever } from "react-icons/md";
import { useParams } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
    id_review:string
  renderReviewOverallRating: (OverallReview: number,restReview:IReview,visitorsCount:ICountPatientReview[]) => void;
}


const DeleteModal: FC<IProps> = ({ id_review,renderReviewOverallRating }) => {
  const [open, setOpen] = useState(false);
  const {id}=useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/reviews/${id_review}`);

      console.log('Review Deleted successfully:', response.data);
      const visitorsCount=response.data.visitors.filter((visitor:ICountPatientReview)=>visitor.doctorId.toString() ==id);      

      
      const restData:IReview[]=response.data.restData.filter((review:IReview)=>review.doctor ===id);      
      const Reviews: IRating[] =restData.map((review: IReview) => ({
        rating: review.rating,
    }));

    // Calculate overall rating
    const totalRating = Reviews.reduce((sum, review) => sum + review.rating, 0);
    const calculatedOverallRating =Reviews.length? totalRating / Reviews.length :0;
    console.log('Review Rating:', calculatedOverallRating);

      renderReviewOverallRating(Math.round(calculatedOverallRating),response.data.deleteReview,visitorsCount);
      handleClose();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ textAlign: '', mt: 1 }}>
        <Button  onClick={handleClickOpen}>
        <MdDeleteForever className="text-red-600 hover:text-red-700 w-7 h-7 transition-transform duration-300 hover:scale-150 "/>     
           </Button>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '600px' } }}
      >
        <Typography component="div" className="text-center p-2 rounded-t-lsm text-white bg-blue-600" gutterBottom>
          Delete Your Review
        </Typography>
        <DialogTitle className='text-red-500'>Confirm Delete Your Review?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleSubmit} className='text-red-500'>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteModal;
