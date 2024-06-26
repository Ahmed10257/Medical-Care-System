import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen text-center">
      <header className="bg-green-200 w-full p-5">
        <Navbar />
      </header>
      <main className="flex-grow ">
        <Outlet />
      </main>
      <footer className="bg-gray-400 w-full p-5">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
