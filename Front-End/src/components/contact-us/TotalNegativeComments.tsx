import React from "react";
import { ThumbsDown } from "lucide-react";

interface TotalNegativeCommentsProps {
  count: number;
}

const TotalNegativeComments: React.FC<TotalNegativeCommentsProps> = ({
  count,
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full">
      <h3 className="text-blue-500 text-xl font-bold">
        Negative
        <ThumbsDown className="inline ml-5 mb-2" />
      </h3>
      <div className="text-3xl font-semibold text-red-500">{count}</div>
    </div>
  );
};

export default TotalNegativeComments;
