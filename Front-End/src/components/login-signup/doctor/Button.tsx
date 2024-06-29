interface IProps {
    text?: string;
    className?: string;
    type: "submit" | "reset" | "button";
    children?: React.ReactNode;
}
const Button = ({text, className, type, children, ...rest}: IProps) => {    
    return (
        <button type={type} className={`bg-blue-600 text-white text-sm font-bold py-2 px-5 rounded-md mt-4 ${className}`} {...rest}>
            {children || text}
        </button>
    );
};

export default Button;