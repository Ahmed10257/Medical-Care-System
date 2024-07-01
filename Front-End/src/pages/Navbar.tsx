import { Link } from "react-router-dom";
import NormalNav from "../components/Navbar/NormalNav";
import SidBar from "../components/Navbar/SidBar";
import logo from '../assets/logo/lo.png'
const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 h-20 dark:bg-blue-700 ">
        <div className="max-w-screen-xl flex h-20 items-center justify-between mx-16">
          <div>
            <Link to='/'
              className=" "
            >

              <img
                src={logo}
                alt="Vezeeta Logo"
               className="w-44 h-44"
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <NormalNav />
          </div>

          <div className="md:hidden">
            <SidBar />
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
