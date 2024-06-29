
interface IProps {
    message: string
}
const ErrorMessage = ({message}: IProps) => {    
    return message ? <span className="text-red-700 text-xs block">{message}</span> : null;
};

export default ErrorMessage;