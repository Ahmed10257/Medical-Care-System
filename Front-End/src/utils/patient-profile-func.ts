import {
  FormData,
  FormPasswordData,
  ContactFrom,
} from "../interfaces/patient-profile";
import axios from "axios";
import { PatientAppointment } from "../interfaces/patient-profile";

// UpdateForm Component
// -----------------------------------------------------------------------
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
// -----------------------------------------------------------------------
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

// Appointment Component
// -----------------------------------------------------------------------
export const fetchAppointments = async (
  pId: string,
  setAppointments: React.Dispatch<React.SetStateAction<PatientAppointment[]>>
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/appointments/patient/${pId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }
    const data = await response.json();

    const appointmentsWithDoctorDetails = await Promise.all(
      data.map(async (appointment: PatientAppointment) => {
        const doctorDetails = appointment.doctor_id
          ? await getDoctorDetails(appointment.doctor_id)
          : {
              name: "Unknown Doctor",
              address: { country: "Unknown", city: "Unknown", region: 0 },
            };
        return {
          ...appointment,
          doctorName: doctorDetails.name,
          doctorAddress: `${doctorDetails.address.country} - ${doctorDetails.address.city} - ${doctorDetails.address.region}`,
        };
      })
    );

    setAppointments(appointmentsWithDoctorDetails);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};
// -----------------------------------------------------------------------
export const getDoctorDetails = async (doctorId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/doctor/${doctorId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor");
    }
    const data = await response.json();
    return {
      name: data.name,
      address: {
        country: data.address.country,
        city: data.address.city,
        region: data.address.region,
      },
    };
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return {
      name: "Unknown Doctor",
      address: { country: "Unknown", city: "Unknown", region: 0 },
    };
  }
};
//-------------------------------------------------------------------------
export const handleCancel = async (
  appointmentToCancel: string | null,
  appointments: PatientAppointment[],
  setAppointments: React.Dispatch<React.SetStateAction<PatientAppointment[]>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAppointmentToCancel: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!appointmentToCancel) return;

  try {
    const response = await axios.patch(
      `http://localhost:3000/appointments/${appointmentToCancel}`,
      {
        status: "cancelled",
      }
    );

    const updatedAppointment = response.data;

    const doctorDetails = await getDoctorDetails(updatedAppointment.doctor_id);
    const updatedAppointmentWithDoctorDetails = {
      ...updatedAppointment,
      doctorName: doctorDetails.name,
      doctorAddress: `${doctorDetails.address.country} - ${doctorDetails.address.city} - ${doctorDetails.address.region}`,
    };

    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentToCancel
        ? updatedAppointmentWithDoctorDetails
        : appointment
    );

    setAppointments(updatedAppointments);
    setIsModalOpen(false);
    setAppointmentToCancel(null);
  } catch (error) {
    console.error("Error cancelling appointment:", error);
  }
};
// -----------------------------------------------------------------------------------
export const validateContact = (formData: ContactFrom) => {
  const newErrors: any = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]*$/;

  if (!formData.name) {
    newErrors.name = "Name is required.";
  } else if (formData.name.length < 3) {
    newErrors.name = "At least 3 characters";
  } else if (formData.name.length > 50) {
    newErrors.name = "At most 50 characters";
  } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
    newErrors.name = "Must contain only letters";
  }
  if (!formData.email) {
    newErrors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  }
  if (formData.mobile.toString().length === 0) {
    newErrors.mobile = "Mobile is required.";
  } else if (formData.mobile.toString().length > 11) {
    newErrors.mobile = "Must be 11 digits.";
  } else if (formData.mobile.toString().length < 11) {
    newErrors.mobile = "Must be 11 digits.";
  } else if (!phoneRegex.test(formData.mobile.toString())) {
    newErrors.mobile = "Must contain only numbers.";
  }
  if (!formData.comments) {
    newErrors.comments = "Comment is required.";
  } else if (formData.comments.length < 10) {
    newErrors.comments = "Must be at least 3 characters.";
  } else if (formData.comments.length > 300) {
    newErrors.comments = "Must be at most 300 characters.";
  } else if (!/^[a-zA-Z\s]*$/.test(formData.comments)) {
    newErrors.comments = " Must contain only letters";
  }

  return newErrors;
};
