import classNames from "classnames";

interface IProps {
  imageURL?: string;
  title: string;
  description: string;
  button?: string;
  backgroundColor: string;
  buttonColor?: string;
}

const LongCard = ({
  imageURL,
  title,
  description,
  button,
  backgroundColor,
  buttonColor,
}: IProps) => {
  return (
    <div
      className={classNames(
        "container border rounded-lg mx-auto my-6 px-6 flex flex-col md:flex-row items-center md:space-x-4 h-auto md:h-40",
        `${backgroundColor}`
      )}
    >
      {imageURL && (
        <img
          src={imageURL}
          alt="Card Image"
          className="rounded-full w-28 h-28 object-cover object-center mx-auto my-3 md:mx-0"
        />
      )}
      <div className="p-4 flex flex-col items-start flex-1">
        <h2 className={`text-3xl font-bold mb-2 text-${buttonColor} `}>
          {title}
        </h2>
        <p
          className={`mb-4 text-start w-full md:text-md text-lg whitespace-pre-line text-${buttonColor}`}
        >
          {description}
        </p>
      </div>
      {button && (
        <button
          className={`mt-auto mb-6 py-4 px-4 bg-${buttonColor} text-${backgroundColor} rounded-lg w-full md:w-1/4`}
        >
          {button}
        </button>
      )}
    </div>
  );
};

export default LongCard;
