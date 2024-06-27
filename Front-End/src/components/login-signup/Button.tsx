import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    className: string;
    width?: "w-full" | "w-fit" | "w-50"
}
const Button = ({children, className, width, ...rest}: IProps) => {    
    return (
        <button className={`${className} outline-none hover:opacity-70 font-bold text-white ${width} p-2 rounded-sm`} {...rest}>{children}</button>
    );
};

export default Button;