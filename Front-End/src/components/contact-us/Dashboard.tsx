import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import TotalComments from "./TotalComments";
import TotalPositiveComments from "./TotalPositiveComments";
import TotalNegativeComments from "./TotalNegativeComments";
import { BadImpression } from "../../data/cantact-dashboard";
import { User } from "../../interfaces/contactus";

const ITEMS_PER_PAGE = 5;

const checkBadImpression = (description: string) => {
  return BadImpression.some((word) => description.toLowerCase().includes(word));
};

const truncateText = (text: string, wordCount: number) => {
  return text.split(" ").slice(0, wordCount).join(" ");
};

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPositiveComments, setTotalPositiveComments] = useState(0);
  const [totalNegativeComments, setTotalNegativeComments] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/contact").then((response) => {
      const fetchedUsers = response.data.map((user: User) => ({
        ...user,
        status: checkBadImpression(user.comments) ? "negative" : "positive",
      }));
      setUsers(fetchedUsers);
      setTotalUsers(fetchedUsers.length);
      const positiveCount = fetchedUsers.filter(
        (user: User) => !checkBadImpression(user.comments)
      ).length;
      setTotalPositiveComments(positiveCount);

      const negativeCount = fetchedUsers.filter((user: User) =>
        checkBadImpression(user.comments)
      ).length;
      setTotalNegativeComments(negativeCount);
    });
  }, []);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/contact/${id}`).then(() => {
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      setTotalUsers(updatedUsers.length);
      const positiveCount = updatedUsers.filter(
        (user) => user.status === "positive"
      ).length;
      setTotalPositiveComments(positiveCount);
      const negativeCount = updatedUsers.filter(
        (user) => user.status === "negative"
      ).length;
      setTotalNegativeComments(negativeCount);
    });
  };

  const handleShow = (user: User) => {
    setCurrentUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="w-full md:w-7/12 mb-4 md:mb-0 lg:ml-28">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Users</h2>
          <div className="bg-white shadow rounded-lg">
            {currentUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b last:border-0"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-semibold">
                      {truncateText(user.name, 2)[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">
                      {truncateText(user.name, 2)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {truncateText(user.comments, 3)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      user.status === "positive" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-sm text-gray-500">
                    {user.createdAt}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-1 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleShow(user)}
                    className="px-4 py-1 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                  >
                    Show
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition lg:w-24"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition lg:w-24"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          {currentUser && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="User Details"
              className="fixed inset-0 flex items-center justify-center p-4"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl text-center text-blue-500 font-bold mb-4">
                  User Details
                </h2>
                <div>
                  <p>
                    <strong className="text-blue-500">Name:</strong>{" "}
                    {currentUser.name}
                  </p>
                  <p>
                    <strong className="text-blue-500">Email:</strong>{" "}
                    {currentUser.email}
                  </p>
                  <p>
                    <strong className="text-blue-500">Comments:</strong>{" "}
                    {currentUser.comments}
                  </p>
                  <p>
                    <strong className="text-blue-500">Date:</strong>{" "}
                    {currentUser.createdAt}
                  </p>
                  <p>
                    <strong className="text-blue-500">Status:</strong>{" "}
                    {currentUser.status}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition"
                >
                  Close
                </button>
              </div>
            </Modal>
          )}
        </div>
        <div className="w-full md:w-2/12 lg:mr-20">
          <div className="mb-4">
            <TotalComments count={totalUsers} />
          </div>
          <div className="mb-4">
            <TotalPositiveComments count={totalPositiveComments} />
          </div>
          <div className="mb-4">
            <TotalNegativeComments count={totalNegativeComments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
