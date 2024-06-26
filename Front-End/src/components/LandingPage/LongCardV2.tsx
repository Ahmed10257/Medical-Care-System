import classNames from "classnames";

interface IProps {
  imageURL?: string;
  title: string;
  description: string;
  button?: string;
  backgroundColor: string;
  buttonColor?: string;
  textColor: string;
}

const LongCardV2 = ({
  title,
  description,
  button,
  backgroundColor,
  buttonColor,
  textColor,
}: IProps) => {
  return (
    <div
      className={classNames(
        "container border rounded-lg mx-auto my-6 p-4 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4",
        backgroundColor
      )}
    >
      <div className="p-4 flex flex-col items-start flex-1">
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 text-${textColor}`}>
          {title}
        </h2>
        <p
          className={`mb-4 text-start w-full md:w-4/5 text-md md:text-lg whitespace-pre-line text-${textColor} overflow-hidden overflow-ellipsis`}
          style={{
            maxHeight: "100px",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {description}
        </p>
        {button && (
          <button
            className={`mt-auto py-2 md:py-4 px-4 bg-${buttonColor} text-${backgroundColor} rounded-lg w-full md:w-1/4 hover:bg-opacity-90`}
          >
            {button}
          </button>
        )}
      </div>
    </div>
  );
};

export default LongCardV2;
