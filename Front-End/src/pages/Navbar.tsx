import { Link } from "react-router-dom";
import NormalNav from "../components/Navbar/NormalNav";
import SidBar from "../components/Navbar/SidBar";
const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-blue-700 ">
        <div className="max-w-screen-xl flex  items-center justify-between mx-16">
          <div>
            <Link to='/'
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <img
                src="https://game.vezeeta.com/assets/vezeetaLogo.png"
                width={200}
                alt="Vezeeta Logo"
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
