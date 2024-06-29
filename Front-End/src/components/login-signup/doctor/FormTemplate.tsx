interface IProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}

const FormTemplate = ({ title, children , subTitle}: IProps) => {
  return (
    <div className="flex flex-col bg-white min-h-full w-8/12 m-auto shadow-md rounded-sm pt-10">
      <h1 className="text-xl font-bold text-gray-600  w-full ml-10 m-auto text-start">{title}</h1>
      <h1 className="text-sm text-gray-400  w-full ml-10 m-auto text-start">{subTitle}</h1>
      <div className="flex flex-col justify-center items-center">{children}</div>
    </div>
  );
};

export default FormTemplate;
