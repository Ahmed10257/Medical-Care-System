import SearchBar from "../components/SearchBar/SearchBar";
import ContactForm from "../components/contact-us/ContactForm";

interface IProps {}
const ContactUs = (props: IProps) => {
  console.log(props);
  return (
    <>
      <div className="container flex flex-col w-full lg:justify-center">
        <div className="mb-5 w-8/12 ml-56 mt-0 hidden lg:block">
          <SearchBar />
        </div>
        <div className="flex w-12/12 justify-center mr-9 ">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
