import { ReactNode } from "react";

interface IProps {
  title: string;
  children?: ReactNode;
  lgWidth?: string;
  mdWidth?: string;
  smWidth?: string;
}

const FormTemplate = ({
  title,
  children,
  lgWidth,
  mdWidth,
  smWidth,
}: IProps) => {
  return (
    <div
      className={`lg:w-${lgWidth} md:w-${mdWidth} sm:w-${smWidth} w-11/12 flex flex-col bg-white rounded-xl border`}
    >
      <div className="bg-blue-600 rounded-t-xl h-6 text-white flex items-center justify-center">
        <h1>{title}</h1>
      </div>
      <div className="flex flex-col p-4">{children}</div>
    </div>
  );
};

export default FormTemplate;
