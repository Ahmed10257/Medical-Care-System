import { FormData, FormPasswordData } from "../interfaces/patient-profile";

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

export const validatePassword = (formData: FormPasswordData) => {
  const newErrors: any = {};

  if (!formData.oldPassword) {
    newErrors.oldPassword = "Old Password is required.";
  }
  if (!formData.newPassword) {
    newErrors.newPassword = "New Password is required.";
  } else if (formData.newPassword.length < 6) {
    newErrors.newPassword = "Password must be at least 6 characters.";
  } else if (formData.newPassword.length > 50) {
    newErrors.newPassword = "Password must be at most 50 characters.";
  }
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required.";
  } else if (formData.confirmPassword !== formData.newPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  return newErrors;
};
