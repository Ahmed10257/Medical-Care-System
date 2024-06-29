import { FC, ReactNode } from "react";
import { Star } from 'lucide-react';
import Rating from '@mui/material/Rating';

interface IProps {
  overallRating: number;
  children?: ReactNode;
  numberOfReviews:number;
}

const OverallRating: FC<IProps> = ({ overallRating, children ,numberOfReviews}) => {
  return (
    <div id="patients-reviews" className="bg-white flex flex-col gap-4 p-8 rounded-t-lg border-b-slate-100 border-b-8">
      <div className="">
        <Star color="blue" />
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="text-gray-600 font-bold pb-5 text-base">
          Patients’ Reviews:
        </div>

        <div className="w-full p-4 flex flex-col justify-center items-center text-gray-500 text-sm">
          <Rating name="read-only" value={overallRating} size="large" precision={0.5} readOnly />
          <span className="bg-blue-600 text-white rounded-md p-1 px-5 mt-5 text-lg">
            <span className="font-bold px-1">{overallRating}</span>/5
          </span>

          <div className="mt-4">
            <p className="font-bold text-lg">Overall Rating</p>
            <p className="">From {numberOfReviews} Visitors</p>
          </div>
        </div>
      </div>

      <div className="w-full mb-4 bg-white flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default OverallRating;
