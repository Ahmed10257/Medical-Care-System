import { Fragment } from "react";

interface IProps {
  imageURL?: string;
  title: string;
  description: string;
  button?: string;
}

const LongCard = ({ imageURL, title, description, button }: IProps) => {
  return (
    <Fragment>
      <div className="border rounded-lg overflow-hidden max-w-3xl mx-auto shadow-md flex-1 my-6 h-36 p-2 flex-row-reverse">
        {imageURL && (
          <img
            src={imageURL}
            alt="Card Image"
            className="rounded-full w-32 h-32 object-cover object-center my-auto"
          />
        )}
        <div className="p-4 flex flex-col justify-start ">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="mb-4">{description}</p>
          {button && (
            <button className="mt-auto py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
              {button}
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default LongCard;
