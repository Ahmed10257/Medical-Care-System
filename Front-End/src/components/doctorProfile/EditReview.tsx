import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import HoverRating from './Stars';
import { FaRegEdit } from "react-icons/fa";
import { IRating, IReview } from '../../interfaces/DoctorData';
import { useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalEditReviewProps {
  id_review: string;
  renderReviewOverallRating: (OverallReview: number, reviewUpdated: IReview) => void;
}

const ModalEditReview: FC<ModalEditReviewProps> = ({ id_review, renderReviewOverallRating }) => {
  const [open, setOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [rating, setRating] = useState<number | null>(2);
  const [error, setError] = useState('');
  const [reviewId, setReviewId] = useState(id_review);
  const { id } = useParams();

  const handleClickOpen = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/reviews/${reviewId}`);
      setReviewComment(response.data.review);
      setRating(response.data.rating);
      setReviewId(response.data._id);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching review:', error);
      setError('Error fetching review. Please try again.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!reviewComment.trim()) {
      setError('Review comment is required');
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:3000/reviews/${reviewId}`, {
        rating: rating,
        review: reviewComment,
      });

      const restData: IReview[] = response.data.restData.filter((review: IReview) => review.doctor === id);

      // Update restData with new rating
      const updatedRestData: IReview[] = restData.map(review => {
        if (review._id === reviewId) {
          return {
            ...review,
            rating: rating || 0 
          };
        }
        return review;
      });

      const Reviews: IRating[] = updatedRestData.map((review: IReview) => ({
        rating: review.rating || 0 
      }));

      // Calculate overall rating
      const totalRating = Reviews.reduce((sum, review) => sum + review.rating, 0);
      const calculatedOverallRating = Reviews.length ? totalRating / Reviews.length : 0;
      console.log('Review Rating:', calculatedOverallRating);

      handleClose();
      setReviewComment('');
      setRating(null);
      setError('');
      renderReviewOverallRating(Math.round(calculatedOverallRating), response.data.review);

    } catch (error) {
      console.error('Error updating review:', error);
      setError('Error updating review. Please try again.');
    }
  };

  const handleReviewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewComment(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ textAlign: '', mt: 1 }}>
        <Button onClick={handleClickOpen}>
          <FaRegEdit size={20} className="text-blue-600 hover:text-blue-700 w-6 h-6 transition-transform duration-300 hover:scale-150 " />
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
          Edit Your Review
        </Typography>
        <DialogTitle>Edit Your Review</DialogTitle>
        <DialogContent>
          <HoverRating value={rating} onChange={setRating} />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="review"
            label="Leave comment"
            type="text"
            fullWidth
            variant="standard"
            value={reviewComment}
            onChange={handleReviewCommentChange}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!reviewComment.trim()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ModalEditReview;
