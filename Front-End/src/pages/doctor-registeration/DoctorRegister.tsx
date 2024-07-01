import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  LockKeyholeOpen,
  Mail,
  CircleArrowRight,
  CircleArrowLeft,
  CheckIcon,
} from "lucide-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import FormTemplate from "../../components/login-signup/doctor/FormTemplate";
import InputDoctor from "../../components/login-signup/doctor/Input";
import Button from "../../components/login-signup/doctor/Button";
import { DoctorSignUp } from "../../interfaces/DoctorSignUp";
import { DoctorSignUpValidation } from "../../validations/DoctorSignUp";
import ImageUpload from "../../components/login-signup/doctor/UploadImage";
import Swal from "sweetalert2";
import { configAxios } from "../../config/api";
import { userGender } from "../../types/SignUp";
import { Baseline } from "lucide-react";
import { Phone } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { MapPin } from "lucide-react";
import { Navigation2 } from "lucide-react";
import { Globe } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { ChevronRight } from "lucide-react";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getAuthDoctor, getDoctor } from "../../utils/functions";

const DoctorRegister = () => {
  getAuthDoctor();
  getDoctor();

  const initialUserState: DoctorSignUp = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    genaralSpecialization: "",
    address: {
      region: 0,
      city: "",
      state: "",
    },
    birthdate: "",
    image: "" || "Front-End/src/assets/images/user-removebg-preview.png",
    gender: "male",
  };

  const [user, setUser] = useState<DoctorSignUp>(initialUserState);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<DoctorSignUp>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    genaralSpecialization: "",
    address: {
      region: "" as unknown as number,
      city: "",
      state: "",
    },
    birthdate: "",
    image: "",
    gender: "" as userGender,
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (user.address && name in user.address) {
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name]: value,
        },
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: {
          ...prevErrors.address,
          [name]: "",
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessages = DoctorSignUpValidation({
      ...user,
      [name]: value,
    });
    if (name in user.address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: {
          ...prevErrors.address,
          [name]:
            errorMessages.address?.[name as keyof typeof errorMessages.address],
        },
      }));
    } else {
      setErrors({
        ...errors,
        [name]: errorMessages[name as keyof DoctorSignUp],
      });
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedImageFile(file);
    setUser((prevUser) => ({
      ...prevUser,
      image:
        file.name || "Front-End/src/assets/images/user-removebg-preview.png",
    }));
  };

  const onSubmitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const errorMessages = DoctorSignUpValidation(user);

    const isValid = Object.values(errorMessages).every((value) => {
      if (typeof value === "object") {
        return Object.values(value).every((subValue) => subValue === "");
      }
      return value === "";
    });

    if (!isValid) {
      setErrors(errorMessages);
      console.log("Form has errors:", errorMessages);
      return;
    }

    console.log("Form submitted successfully:", user);

    setUser(initialUserState);
    setErrors({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      genaralSpecialization: "",
      address: {
        region: "" as unknown as number,
        city: "",
        state: "",
      },
      birthdate: "",
      image: "",
      gender: "male",
    });

    try {
      configAxios
        .post("/doctor-auth/signup", user)
        .then((response) => {
          console.log(response.data);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Registered successfully!",
          }).then(() => {
            window.location.href = "/doctor/login";
          });
        })
        .catch((error) => {
          console.log("Error:", error);

          const errorMessage = error.response.data.message;
          let displayMessage = "Something went wrong!";
          if (errorMessage.includes("Email already exists")) {
            displayMessage =
              "Email already exists. Please use a different email.";
          } else if (errorMessage.includes("Invalid credentials")) {
            displayMessage = "Invalid credentials provided.";
          }

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: displayMessage,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        });
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const validateCurrentStep = () => {
    const currentStepFields: { [key: number]: string[] } = {
      0: ["firstName", "lastName", "phone", "birthdate"],
      1: ["email", "password", "genaralSpecialization", "region", "city", "state"],
      2: [],
    };

    const fieldsToValidate = currentStepFields[activeStep];
    const errorMessages = DoctorSignUpValidation(user);
    const stepErrors: Partial<DoctorSignUp> = {};

    fieldsToValidate.forEach((field) => {
      if (field in user.address) {
        stepErrors.address = {
          ...stepErrors.address,
          [field]:
            errorMessages.address?.[
              field as keyof typeof errorMessages.address
            ],
        };
      } else {
        stepErrors[field] = errorMessages[field as keyof DoctorSignUp];
      }
    });

    console.log("Validation errors for current step:", stepErrors);

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...stepErrors,
    }));

    return Object.values(stepErrors).every((error) => {
      if (typeof error === "object") {
        return Object.values(error).every((subError) => subError === "");
      }
      return error === "";
    });
  };

  const steps = [
    { label: "Personal Info", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Account Info", icon: <CogIcon className="w-5 h-5" /> },
    { label: "Confirmation", icon: <UserIcon className="w-5 h-5" /> },
  ];

  const genaralSpecializations = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Dermatology" },
    { id: 3, name: "Neurology" },
    { id: 4, name: "Pediatrics" },
    { id: 5, name: "Surgery" },
  ];

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(genaralSpecializations[0]);

  const filteredgenaralSpecializations =
    query === ""
      ? genaralSpecializations
      : genaralSpecializations.filter((genaralSpecialization) => {
          return genaralSpecialization.name
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="w-full flex flex-col items-center lg:flex-row md:flex-col sm:flex-col space-x-10">
            <div>
              <ImageUpload onFileSelect={handleFileSelect} />
            </div>
            <div className="flex flex-col w-full">
              <InputDoctor
                icon={Baseline}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`rounded-none ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                error={errors.firstName}
              />
              <InputDoctor
                icon={Baseline}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`rounded-none ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                error={errors.lastName}
              />
              <InputDoctor
                icon={Phone}
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={user.phone}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`rounded-none ${
                  errors.phone ? "border-red-500" : ""
                }`}
                error={errors.phone}
              />
              <InputDoctor
                icon={CalendarCheck}
                type="date"
                id="birthdate"
                name="birthdate"
                placeholder="Birthdate"
                value={user.birthdate.split("T")[0]}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`rounded-none ${
                  errors.birthdate ? "border-red-500" : ""
                }`}
                error={errors.birthdate}
              />
              <div className="flex space-x-10 mt-3">
                <div className="flex space-x-2 ">
                  <InputDoctor
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={user.gender === "male"}
                    onChange={onChangeHandler}
                    className="mt-1.5"
                  />
                  <span>Male</span>
                </div>
                <div className="flex space-x-2 ">
                  <InputDoctor
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={user.gender === "female"}
                    onChange={onChangeHandler}
                    className="mt-1.5"
                  />
                  <span>Female</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col w-full">
            <InputDoctor
              icon={Mail}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${errors.email ? "border-red-500" : ""}`}
              error={errors.email}
            />
            <InputDoctor
              icon={LockKeyholeOpen}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${
                errors.password ? "border-red-500" : ""
              }`}
              error={errors.password}
            />
            <InputDoctor
              icon={MapPin}
              type="number"
              id="region"
              name="region"
              placeholder="region"
              value={user.address.region}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${
                errors.address.region ? "border-red-500" : ""
              }`}
              error={errors.address.region}
            />

            <Combobox
              value={selected}
              onChange={(value) => {
                setSelected(value);
                setUser((prevUser) => ({
                  ...prevUser,
                  genaralSpecialization: value.name,
                }));
              }}
              onClose={() => setQuery("")}
            >
              <div
                className={`relative ${
                  errors.address.city ? "border-red-500" : ""
                }`}
              >
                <Stethoscope className="absolute w-5 h-5 text-gray-400 mt-3" />
                <ComboboxInput
                  className="w-full border border-t-0 border-e-0 border-l-0 bg-transparent text-gray-400 focus:outline-none border-b-gray-600 mb-3 px-7 py-3"
                  displayValue={(genaralSpecialization: { name: string }) =>
                    genaralSpecialization.name
                  }
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Select a genaralSpecialization"
                  disabled
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </ComboboxButton>
              </div>

              <ComboboxOptions className="absolute mt-1 w-1/2 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {filteredgenaralSpecializations.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredgenaralSpecializations.map((genaralSpecialization) => (
                    <ComboboxOption
                      key={genaralSpecialization.id}
                      value={genaralSpecialization}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {genaralSpecialization.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-indigo-600"
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Combobox>

            <InputDoctor
              icon={Navigation2}
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={user.address.city}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${
                errors.address.city ? "border-red-500" : ""
              }`}
              error={errors.address.city}
            />
            <InputDoctor
              icon={Globe}
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={user.address.state}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`rounded-none ${
                errors.address.state ? "border-red-500" : ""
              }`}
              error={errors.address.state}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center items-center space-y-10 w-full">
            <CircleCheckBig className="w-36 h-36 text-green-500" />
            <p className="text-center">
              Confirm your details and click 'Create Account' to complete your
              registration.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ol className="flex items-center text-sm justify-center sm:text-xs text-gray-500 dark:text-gray-400 mb-0 mt-10 lg:w-8/12">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex md:w-full items-center ${
              index <= activeStep
                ? "text-blue-800 dark:text-blue-800"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step.icon}
            <span className="flex items-center w-full">
              <span className="hidden sm:inline-flex sm:ms-2 w-36">
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={`${
                    index < activeStep
                      ? "border-blue-800 dark:border-blue-800"
                      : "border-gray-200 dark:border-gray-700"
                  } w-full h-1 border-b after:mx-6 xl:after:mx-10`}
                />
              )}
            </span>
          </li>
        ))}
      </ol>
      <FormTemplate title="Create an Account">
        <form
          className="w-9/12 m-2 h-full lg:w-1/2 md:w-6/12 sm:w-8/12 flex flex-col items-center mb-16"
          onSubmit={onSubmitFormHandler}
        >
          <div className="mt-4 w-full">
            <TransitionGroup>
              <CSSTransition
                key={activeStep}
                timeout={300}
                classNames="step-transition"
              >
                {renderContent()}
              </CSSTransition>
            </TransitionGroup>
          </div>

          <div className="flex justify-between mt-4 w-full">
            <button
              type="button"
              disabled={activeStep === 0}
              onClick={handlePrev}
            >
              <CircleArrowLeft
                className={`w-6 h-6 ${
                  activeStep === 0 ? "text-gray-400" : "text-blue-500"
                }`}
              />
            </button>
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md flex items-center"
              >
                Create Account <ChevronRight />
              </Button>
            ) : (
              <button type="button" onClick={handleNext}>
                <CircleArrowRight className="w-6 h-6 text-blue-500" />
              </button>
            )}
          </div>
        </form>
      </FormTemplate>
      <div className="flex justify-center mt-4 text-zinc-500 font-bold space-y-1 space-x-2">
        <p>Already have an account?</p>
        <Link
          to="/doctor/login"
          className="text-blue-500 font-bold text-sm underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default DoctorRegister;
