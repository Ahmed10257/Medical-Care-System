import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen text-center ">
      <header className="w-full">
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="w-full bottom-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
