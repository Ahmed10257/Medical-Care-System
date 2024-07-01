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
import { configAxios as axios } from "../../config/api";
import HoverRating from './Stars';
import { useParams } from 'react-router-dom';
import { IReview } from '../../interfaces/DoctorData';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  renderReviewNewAdded: (NewReview: IReview) => void;
}

const ModalReview: FC<IProps> = ({renderReviewNewAdded }) => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [rating, setRating] = useState<number | null>(2);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
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
      const response = await axios.post('http://127.0.0.1:3000/reviews', {
        doctor: id,
        patient: "66792459742795e5fb87f3fa", //replace id of patient
        rating: rating,
        review: reviewComment,
      });

      console.log('Review submitted successfully:', response.data);
      renderReviewNewAdded(response.data);
      handleClose();
      setReviewComment('');
      setRating(null);
      setError('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Error submitting review. Please try again.');
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
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add your Review
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
          Add Your Review
        </Typography>
        <DialogTitle>Add Your Review</DialogTitle>
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

export default ModalReview;
