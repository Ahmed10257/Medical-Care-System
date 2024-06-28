interface IProps {
  title: string;
  children: React.ReactNode;
}

const FormTemplate = ({ title, children }: IProps) => {
  return (
    <div className="flex flex-col bg-white min-h-full w-8/12 m-auto mt-10 shadow-md rounded-sm">
      <h1 className="text-2xl font-bold text-gray-600 m-16 text-start">{title}</h1>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};

export default FormTemplate;
