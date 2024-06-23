import { FormData } from "../interfaces/patient-profile";

export const validate = (formData: FormData) => {
  const newErrors: any = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]*$/;

  if (!formData.name) {
    newErrors.name = "Name is required.";
  } else if (formData.name.length < 3) {
    newErrors.name = "Name must be at least 3 characters.";
  } else if (formData.name.length > 50) {
    newErrors.name = "Name must be at most 50 characters.";
  } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
    newErrors.name = "Name must contain only letters and spaces.";
  }
  if (!formData.email) {
    newErrors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  }
  if (!formData.age) {
    newErrors.age = "Age is required.";
  } else if (parseInt(formData.age) < 0) {
    newErrors.age = "Age must be a positive number.";
  } else if (parseInt(formData.age) < 18) {
    newErrors.age = "Age must be greater than 18.";
  }
  if (formData.phone.toString().length === 0) {
    newErrors.phone = "Phone number is required.";
  } else if (formData.phone.toString().length > 11) {
    newErrors.phone = "Phone number must be 11 digits.";
  } else if (formData.phone.toString().length < 7) {
    newErrors.phone = "Phone number must be 11 digits.";
  } else if (!phoneRegex.test(formData.phone.toString())) {
    newErrors.phone = "Phone number must contain only numbers.";
  }

  if (!formData.addresses[0].city) newErrors.city = "City is required.";
  if (!formData.birthDate) newErrors.birthDate = "Birth Date is required.";

  return newErrors;
};
