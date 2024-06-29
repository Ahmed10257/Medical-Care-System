import ContactForm from "../components/contact-us/ContactForm";

interface IProps {}
const ContactUs = (props: IProps) => {
  console.log(props);
  return (
    <>
      <div className="container flex flex-col w-full lg:justify-center">
        <div className="mb-5 mt-0">Mansour Search Bar</div>
        <div className="flex w-12/12 justify-center ">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
