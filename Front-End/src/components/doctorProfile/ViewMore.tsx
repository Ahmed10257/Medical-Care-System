import { FC } from "react";

interface IProps {
  onClick: () => void; 
}

const ViewMore: FC<IProps> = ({ onClick }) => {
  return (
    <div
      className="bg-white flex cursor-pointer p-6 rounded-b-lg justify-center items-center mb-4 text-blue-600 text-sm"
      onClick={onClick} 
    >
      View more
    </div>
  );
};

export default ViewMore;
