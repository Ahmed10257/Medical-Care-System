import React from "react";

interface IProps {
  imageURL?: string;
  title: string;
  description: string;
  link: string;
}

const SmallCard: React.FC<IProps> = ({
  title,
  description,
  link,
  imageURL,
}) => {
  return (
    <div className="bg-white rounded-lg flex flex-col md:flex-row w-full md:full h-auto md:h-44 items-center text-start p-4 md:p-0">
      <img
        src={imageURL}
        alt="Doctor"
        className="w-full md:w-44 h-44 mb-4 md:mb-0 mr-0 md:mr-4 object-cover object-center rounded-lg"
      />
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold my-2 text-gray-500 break-words">
          {title}
        </h2>
        <p className="text-gray-600">{description}</p>
        <a href={link} className="text-blue-500 mt-2 inline-block">
          {link} &rarr;
        </a>
      </div>
    </div>
  );
};

export default SmallCard;
