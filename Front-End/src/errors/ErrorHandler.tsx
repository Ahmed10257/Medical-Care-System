import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';

interface IProps {
    statusCode?: number;
    message?: string;
}

const ErrorHandler = ({ statusCode = 500, message = 'Internal Server Error' }: IProps) => {
    const { pathname } = useLocation();
    console.log(pathname);
    
    return (
        <div className="w-80 m-auto">
            <div className="p-10 text-center">
                <h1 className="text-9xl font-bold text-red-500 mb-4">{statusCode}</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">{message}</h2>
                <div className="flex justify-center space-x-4">
                    <Link to={pathname} reloadDocument className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        <RefreshCcw />
                    </Link>
                    <Link to='/' reloadDocument className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        <HomeIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorHandler;
