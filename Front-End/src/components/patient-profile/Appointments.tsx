import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import Modal from "react-modal";
import { PatientAppointment } from "../../interfaces/patient-profile";
import { getAuthPatient } from "../../utils/functions";
import "./modal-styles.css";
import {
  fetchAppointments,
  handleCancel,
} from "../../utils/patient-profile-func";

Modal.setAppElement("#root");

const Appointments = () => {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(
    null
  );
  const [pId, setPId] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const id = await getAuthPatient();
      setPId(id);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (pId) {
      fetchAppointments(pId, setAppointments);
    }
  }, [pId]);

  const openModal = (id: string) => {
    setAppointmentToCancel(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAppointmentToCancel(null);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      padding: "20px",
      color: "#333",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
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
            <table className="min-w-full border-collapse border border-gray-200 sm:table">
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
                          onClick={() => openModal(appointment._id)}
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
                      {appointment.status === "completed" && (
                        <span className="text-green-500 font-bold">
                          Completed
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Cancellation"
        style={customStyles}
        closeTimeoutMS={300}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
          <p>Are you sure you want to cancel this appointment?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 font-bold hover:bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() =>
                handleCancel(
                  appointmentToCancel,
                  appointments,
                  setAppointments,
                  setIsModalOpen,
                  setAppointmentToCancel
                )
              }
            >
              Confirm
            </button>
            <button
              className="bg-gray-500 text-white font-bold hover:bg-gray-400 px-4 py-2 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Appointments;
