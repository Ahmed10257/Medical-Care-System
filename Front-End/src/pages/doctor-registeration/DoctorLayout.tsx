import { Outlet } from "react-router-dom";
import Header from "./Header";
import './index.css';

const DoctorLayout = () => {    
    return (
        <div className="page-background">
            <Header />
            <Outlet />
        </div>
    );
};

export default DoctorLayout;