import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IProps {

}
const Navbar = (props: IProps) => {   
    console.log(props); 
    return (
        <div>
            <Link to='/'>
                <HomeIcon />
            </Link>
            Navbar
        </div>
    );
};

export default Navbar;