import React from "react";

interface TotalUsersProps {
  count: number;
}

const TotalComments: React.FC<TotalUsersProps> = ({ count }) => {
  return (
    <div className=" bg-white shadow-md rounded-lg h-full">
      <h3 className="text-white bg-blue-500 text-xl font-bold mt-0 rounded-t mb-2 pb-1">
        Total commnets
      </h3>
      <div className="text-3xl font-semibold text-blue-600 pb-5">
        {count}
        <span className="text-sm">comments</span>
      </div>
    </div>
  );
};

export default TotalComments;
