import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { validateContact } from "../../utils/patient-profile-func";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  mobile: string;
  email: string;
  comments: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  comments?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    comments: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "", // Clear the error message when the user starts typing
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateContact(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/contact",
          formData
        );
        if (response.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Your comment has been sent successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        setFormData({
          name: "",
          mobile: "",
          email: "",
          comments: "",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
      <div className="flex flex-col lg:flex-row">
        <div className="border-2 mr-1 flex-col text-start p-4">
          <h2 className="text-xl text-center font-bold mb-4 text-blue-500">
            Contact Us
          </h2>
          <p className="mb-2">
            We are happy to receive your inquiries and suggestions.
          </p>
          <p className="mb-2">
            Call from inside Egypt:{" "}
            <a href="tel:01550327963" className="text-blue-500">
              01550327963
            </a>
          </p>
          <p className="mb-2">
            Call from outside Egypt:{" "}
            <a href="tel:+20225983999" className="text-blue-500">
              +2 02 259 83 999
            </a>
          </p>
          <p className="mb-2">
            Address: 134 Othman Bin Affan Street, behind the Military College -
            Heliopolis
          </p>
          <p>
            Contact Us:{" "}
            <a href="mailto:customercare@vezeeta.com" className="text-blue-500">
              customercare@vezeeta.com
            </a>
          </p>
          <div className="mt-4">
            <a href="#" className="text-blue-500 mx-2">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-blue-500 mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-500 mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="flex-1 p-4 border-2">
          <h2 className="text-xl text-center font-bold mb-5 text-blue-500">
            Send Us Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 border-collapse">
            <div className="w-full">
              <label
                className="w-full lg:mr-11 md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`shadow appearance-none ${
                  formErrors.name ? "border-red-500" : "focus:border-blue-400"
                } border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {formErrors.name && (
                <p className="text-red-500 lg:mr-12 text-xs mt-1">
                  {formErrors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="w-full lg:mr-9 md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
              >
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className={`shadow appearance-none ${
                  formErrors.mobile ? "border-red-500" : "focus:border-blue-400"
                } border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {formErrors.mobile && (
                <p className="text-red-500 lg:-ml-9 text-xs mt-1">
                  {formErrors.mobile}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="w-full lg:mr-12 md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={`shadow appearance-none ${
                  formErrors.email ? "border-red-500" : "focus:border-blue-400"
                } border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {formErrors.email && (
                <p className="text-red-500 lg:-ml-9 text-xs mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="comments"
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0"
              >
                Comments
              </label>
              <textarea
                name="comments"
                placeholder="Enter your comments"
                value={formData.comments}
                onChange={handleChange}
                id="comments"
                className={`shadow appearance-none ${
                  formErrors.comments
                    ? "border-red-500"
                    : "focus:border-blue-400"
                } border-solid border-2 rounded w-full md:w-8/12 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              ></textarea>
              {formErrors.comments && (
                <p className="text-red-500 lg:-ml-18 text-xs mt-1">
                  {formErrors.comments}
                </p>
              )}
            </div>
            <div className="flex lg:w-7/12 justify-center gap-x-4 lg:ml-32 text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
              <button
                type="submit"
                className="lg:w-28 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="lg:w-28 bg-gray-500 hover:bg-gray-400 text-white p-2 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
