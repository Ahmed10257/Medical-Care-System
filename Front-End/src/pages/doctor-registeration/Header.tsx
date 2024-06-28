import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';

const Header = () => {    
    return (
        <div className="w-full h-16 bg-blue-600 flex items-center">
            <Link to={'/doctor/login'} className="pl-96">
                <img src={logo} alt="logo"  />
            </Link>
        </div>
    );
};

export default Header;