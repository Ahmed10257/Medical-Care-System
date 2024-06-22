import { Link } from 'react-router-dom';
interface IProps {

}

const Footer = (props: IProps) => {  
    console.log(props);  
    return (
        <>
            <footer className="bg-white dark:bg-blue-600">
                <div className="mx-auto flex w-full max-w-screen-xl px-4 sm:px-3 lg:px-8 ">
                    <div className="grid grid-cols-2 gap-8 py-6 lg:py-8 md:grid-cols-4">

                        <div className="text-start  order-2   md:order-none   sm:px-20    md:px-1 lg:px-9">
                            <h2 className="mb-6 md:text-lg sm:text-sm font-semibold text-gray-900 uppercase dark:text-white hidden md:block">
                                <img src="https://game.vezeeta.com/assets/vezeetaLogo.png" width={250} alt="Vezeeta Logo" />
                            </h2>

                            <h2 className="mb-6 md:hidden md:text-lg sm:text-sm font-extrabold text-gray-900 uppercase dark:text-white">
                               Vezeeta
                            </h2>
                            <ul className="text-white font-medium text-sm">
                                <li className="mb-2">
                                    <Link to='about' className="hover:underline">About</Link>
                                </li>
                                <li className="mb-2">
                                <Link to='#' className="hover:underline">Our Team</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Careers</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Press</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-start order-1  px-5 md:order-none lg:px-9 md:px-1 ">
                            <h2 className="mb-6   md:text-sm lg:text-lg sm:text-sm font-extrabold text-gray-900 dark:text-white">
                                Search By
                            </h2>
                            <ul className="text-white font-medium text-sm">
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Speciality</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Area</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Insurance</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Hospital</Link>
                                </li> 
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Center</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-start order-4  sm:px-20   md:order-none  lg:px-3 md:px-1 ">
                            <h2 className="mb-6 md:text-sm lg:text-lg  sm:text-sm font-extrabold text-gray-900 dark:text-white">
                                Are you a doctor?
                            </h2>
                            <ul className="text-white font-medium text-sm">
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Join Vezeeta doctors</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-start order-3 px-5 md:order-none lg:px-9 md:px-1 ">
                            <h2 className="mb-6 md:text-sm lg:text-lg  font-extrabold text-gray-900  dark:text-white">
                                Need help?
                            </h2>
                            <ul className="text-white font-medium text-sm">
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Medical Library</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="contact" className="hover:underline">Contact Us</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Terms Of Use</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Privacy Policy</Link>
                                </li> 
                                <li className="mb-2">
                                    <Link to="#" className="hover:underline">Doctors Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
