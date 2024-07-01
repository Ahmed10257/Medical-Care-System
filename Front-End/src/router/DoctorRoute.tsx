import { Outlet } from "react-router-dom";
import { getRole } from "../utils/functions";
import ErrorHandler from "../errors/ErrorHandler";

const DoctorRoute = () => {    
    return getRole() == 'doctor' ? <Outlet /> : <ErrorHandler message="UnAuthorized!!" statusCode={401}/>;
};

export default DoctorRoute;