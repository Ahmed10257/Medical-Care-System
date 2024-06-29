import { Link } from "react-router-dom";
import NormalNav from "../components/Navbar/NormalNav";
import SidBar from "../components/Navbar/SidBar";
import logo from '../assets/logo/lo.png'
const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-blue-700 ">
        <div className="max-w-screen-xl flex  items-center justify-between mx-16">
          <div>
            <Link to='/'
              className=" "
            >
              <div className="flex w-20 h-20">
              <img
                src={logo}
                alt="Vezeeta Logo"
              
              />
              </div>
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
