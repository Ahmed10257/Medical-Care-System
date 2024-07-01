import SearchBar from "../components/SearchBar/SearchBar";
import ContactForm from "../components/contact-us/ContactForm";

interface IProps {}
const ContactUs = (props: IProps) => {
  console.log(props);
  return (
    <>
      <div className="container flex flex-col w-full lg:justify-center">
        <div className="w-7/12 mb-5 justify-center m-auto hidden lg:block">
          <SearchBar />
        </div>
        <div className="flex w-12/12 justify-center m-auto ">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
