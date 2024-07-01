import React, { useState, useEffect } from 'react';
import { configAxios as axios } from "../../config/api";
import Swal from 'sweetalert2';
import { DollarSign, Clock, User } from 'lucide-react';
import { getAuthDoctor } from '../../utils/functions';

interface FormData {
  fees?: number;
  waitingTime?: number;
  about?: string;
}

interface Props {
  initialData: Partial<FormData>;
  onUpdate: (updatedData: FormData) => void;
  onClose: () => void;
}



const WorkingForm: React.FC<Props> = ({ initialData, onUpdate, onClose }) => {
  const [pId, setPId] = useState<string>("");
 
    useEffect(() => {
        async function fetchData() {
            const id = await getAuthDoctor();
            setPId(id);
        }
        fetchData();
    }, []);
  console.log('pId',pId);
  const doctorId = pId; 
  console.log('doctorId',doctorId);

  const [formData, setFormData] = useState<FormData>({
    fees: initialData.fees || 0,
    waitingTime: initialData.waitingTime || 0,
    about: initialData.about || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        fees: initialData.fees !== undefined ? initialData.fees : 0,
        waitingTime: initialData.waitingTime !== undefined ? initialData.waitingTime : 0,
        about: initialData.about || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('doctorId',doctorId);
      const response = await axios.patch(`http://localhost:3000/doctor/${doctorId}`, formData);
      onUpdate(response.data);
      onClose();
      Swal.fire({
        title: 'Success!',
        text: 'Doctor working information updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating doctor data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the doctor data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='form-container'>
      <div className="update-form-container">
        <h1 className="text-xl font-bold text-center w-full rounded-t-lg border p-1" style={{ background: "#0487D9", color: "white" }}>
          Update Working Information
        </h1>
        <form className="update-form mt-5 p-4" onSubmit={handleSubmit}>
          {/* Fees */}
          <div className="flex flex-col md:flex-row mb-4">
            <label className="w-36 md:w-36 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="fees">
              <DollarSign className="inline mr-2 w-5 h-5" />
              Fees
            </label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Fees"
              className="shadow appearance-none border rounded w-full md:ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Waiting Time */}
          <div className="flex flex-col md:flex-row mb-4">
            <label className="w-36 md:w-36 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="waitingTime">
              <Clock className="inline mr-2 w-5 h-5" />
              Waiting Time
            </label>
            <input
              type="number"
              name="waitingTime"
              value={formData.waitingTime}
              onChange={handleChange}
              placeholder="Waiting Time (in minutes)"
              className="shadow appearance-none border rounded w-full md:ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* About You */}
          <div className="flex flex-col md:flex-row mb-4">
            <label className="w-36 md:w-36 text-gray-700 text-md font-bold mb-2 md:mb-0 flex items-center" htmlFor="about">
              <User className="inline mr-2 w-5 h-5" />
              About You
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About your Experience"
              className="shadow appearance-none border rounded w-full md:ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="submit"
              className="text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 mr-4"
              style={{ backgroundColor: "#F21313" }}
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 w-full md:w-28 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkingForm;
