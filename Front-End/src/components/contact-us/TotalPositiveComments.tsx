import React from "react";
import { ThumbsUp } from "lucide-react";

interface TotalNegativeCommentsProps {
  count: number;
  avg: number;
}

const TotalPositiveComments: React.FC<TotalNegativeCommentsProps> = ({
  count,
  avg,
}) => {
  return (
    <div className=" bg-white shadow-md rounded-lg h-full pb-5">
      <h3 className="text-white bg-blue-500 text-xl font-bold mt-0 rounded-t mb-2">
        Positive
        <ThumbsUp className="inline ml-5 mb-2" />
      </h3>
      <div className="text-3xl font-semibold text-green-600">
        {count}
        <span className="text-sm">comments</span>
        <span className="block text-base">{avg} %</span>
      </div>
    </div>
  );
};

export default TotalPositiveComments;
