import React from "react";

interface TotalUsersProps {
  count: number;
}

const TotalComments: React.FC<TotalUsersProps> = ({ count }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full">
      <h3 className="text-blue-500 text-xl font-bold">Total commnets</h3>
      <div className="text-3xl font-semibold text-black-500">{count}</div>
    </div>
  );
};

export default TotalComments;
