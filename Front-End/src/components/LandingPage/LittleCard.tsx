interface IProps {
  type: string;
  header: string;
  title: string;
  icon: JSX.Element;
  message: string;
  description: string;
}

const LittleCard = ({
  type,
  header,
  title,
  icon,
  message,
  description,
}: IProps) => {
  return (
    <div className={type}>
      <div className={header}>
        <div className={title}>
          <span>{icon}</span>
          <h4 className="text-left font-medium text-gray-500 text-2xl my-3">
            {message}
          </h4>
        </div>
      </div>
      <p className="text-left font-medium text-gray-500 text-2md my-3">
        {description}
      </p>
    </div>
  );
};

export default LittleCard;
