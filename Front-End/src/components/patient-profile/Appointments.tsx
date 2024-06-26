import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import axios from "axios";
import { PatientAppointment } from "../../interfaces/patient-profile";

const Appointments = () => {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/appointments/patient/667b250f09e1016668590d19" // patient ID From Token
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

  const handleCancel = async (id: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/appointments/${id}`,
        {
          status: "cancelled",
        }
      );

      const updatedAppointment = response.data;

      const doctorDetails = await getDoctorDetails(
        updatedAppointment.doctor_id
      );
      const updatedAppointmentWithDoctorDetails = {
        ...updatedAppointment,
        doctorName: doctorDetails.name,
        doctorAddress: `${doctorDetails.address.country} - ${doctorDetails.address.city} - ${doctorDetails.address.region}`,
      };

      const updatedAppointments = appointments.map((appointment) =>
        appointment._id === id
          ? updatedAppointmentWithDoctorDetails
          : appointment
      );

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const getDoctorDetails = async (doctorId: string) => {
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

  return (
    <>
      <div className="container mx-auto mt-5 p-5 w-full">
        <div className="mb-3">Mansour Search bar component</div>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <h2
            className="text-xl font-bold p-1 text-center"
            style={{
              background: "#0487D9",
              color: "white",
            }}
          >
            My Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200  sm:table">
              <thead>
                <tr
                  style={{
                    background: "#F1F0EE",
                    color: "#1A82D7",
                  }}
                >
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Doctor
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Address
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="bg-white">
                    <td
                      className="border border-gray-300 px-4 py-2"
                      style={{
                        color: "#0487D9",
                      }}
                    >
                      {appointment.doctorName || "Loading..."}
                    </td>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      style={{
                        color: "#0487D9",
                      }}
                    >
                      {appointment.doctorAddress || "Loading..."}
                    </td>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      style={{
                        color: "#0487D9",
                      }}
                    >
                      {new Date(appointment.date).toLocaleString()}
                    </td>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      style={{
                        color: "#0487D9",
                      }}
                    >
                      {appointment.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.status === "confirmed" && (
                        <button
                          className="flex flex-col items-center font-bold justify-center text-red-500"
                          onClick={() => handleCancel(appointment._id)}
                        >
                          <CircleX className="h-6 w-6 ml-4" />
                          <span className=" text-center ml-3">Cancel</span>
                        </button>
                      )}
                      {appointment.status === "cancelled" && (
                        <span className="text-red-500 font-bold">
                          Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
