import { useState } from "react";
import { CircleX } from "lucide-react";

const Appointments = () => {
  // Sample data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Tamer Yehia HCC",
      where: "3 shehab street, borg alzahraa - floor 5 - beside Hassan Abdou.",
      reservationDate: "20 Jun 2024",
      status: "Confirmed",
    },
    {
      id: 2,
      doctorName: "Tamer Yehia HCC",
      where: "3 shehab street, borg alzahraa - floor 5 - beside Hassan Abdou.",
      reservationDate: "20 Jun 2024",
      status: "Confirmed",
    },
    // Add more appointments as needed
  ]);

  // Function to handle canceling an appointment
  const handleCancel = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Canceled" }
          : appointment
      )
    );
  };

  return (
    <>
      <div className="container mx-auto mt-5 p-5 w-full">
        <div className="mb-3">Mansour Search bar component</div>
        <div className="rounded-lg border border-gray-200">
          <h2
            className="text-2xl font-bold p-3"
            style={{
              background: "#0487D9",
              color: "white",
            }}
          >
            My Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200 hidden sm:table">
              <thead>
                <tr>
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
                  <tr
                    key={appointment.id}
                    className="bg-white even:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.doctorName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.where}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.reservationDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.status === "Confirmed" && (
                        <button
                          className="flex flex-col items-center font-bold justify-center text-red-500"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          <CircleX className="h-6 w-6" />
                          <span>Cancel</span>
                        </button>
                      )}
                      {appointment.status === "Canceled" && (
                        <span className="text-red-500 font-bold">
                          Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sm:hidden">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="grid grid-cols-1 border-b border-gray-200 py-2"
                >
                  <div className="flex justify-between px-4 py-2 bg-gray-50">
                    <span className="font-bold">Doctor Name</span>
                    <span>{appointment.doctorName}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                    <span className="font-bold">Where</span>
                    <span>{appointment.where}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2 bg-gray-50">
                    <span className="font-bold">Reservation Date</span>
                    <span>{appointment.reservationDate}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                    <span className="font-bold">Status</span>
                    <span>{appointment.status}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2 bg-gray-50">
                    <span className="font-bold">Action</span>
                    {appointment.status === "Confirmed" && (
                      <button
                        className="flex items-center space-x-1 text-red-500"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <CircleX className="h-6 w-6" />
                        <span>Cancel</span>
                      </button>
                    )}
                    {appointment.status === "Canceled" && (
                      <span className="text-red-500 font-bold">Cancelled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
