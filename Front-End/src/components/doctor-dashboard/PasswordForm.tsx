import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { LockKeyhole, KeyRound, ShieldCheck } from "lucide-react";
import { validatePassword } from "../../utils/patient-profile-func";
import './PasswordForm.css';

interface FormPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordFormProps {
  onClose: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "oldPassword") setOldPassword(value);
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormPasswordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const newErrors = validatePassword(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const responseUpdate = await axios.patch(
        `http://localhost:3000/doctor/667ff9815e77f767fdfdad82/update-password`, // Replace STATIC_DOCTOR_ID with your actual doctor's ID
        {
          oldPassword,
          newPassword,
        }
      );

      if (responseUpdate.data.success) {
        Swal.fire({
          title: "Success",
          text: "Password updated successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose(); // Close the component after successful update
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to update password. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to update password. Please try again.",
      }));
    }
  };

  return (
    <div className="password-container"> 
      <div className="bg-white shadow-md rounded-lg text-left pt-0">
        <h1 className="text-xl font-bold text-center w-full rounded-t-lg border p-1" style={{ background: "#0487D9", color: "white" }}>
          Change Password
        </h1>
        <form onSubmit={changePassword} className="mt-5 p-4 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <label className="w-24 text-gray-700 text-md font-bold mr-4" htmlFor="oldPassword">
                <LockKeyhole className="inline mx-1 w-4 h-5" />
                Current Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.oldPassword ? "border-red-500" : ""
                }`}
                id="oldPassword"
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => handleChange("oldPassword", e.target.value)}
                placeholder="Enter your old password"
              />
            </div>
            {errors.oldPassword && <p className="text-red-500 text-xs font-bold italic mt-1 ml-28">{errors.oldPassword}</p>}
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <label className="w-24 text-gray-700 text-md font-bold mr-4" htmlFor="newPassword">
                <KeyRound className="inline mx-1 w-4 h-5" />
                New Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
                id="newPassword"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                placeholder="Enter your new password"
              />
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs font-bold italic mt-1 ml-28">{errors.newPassword}</p>}
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <label className="w-24 text-gray-700 text-md font-bold mr-4" htmlFor="confirmPassword">
                <ShieldCheck className="inline mx-1 w-4 h-5" />
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Confirm your new password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs font-bold italic mt-1 ml-28">{errors.confirmPassword}</p>}
          </div>

          {errors.general && <p className="text-red-500 text-xs font-bold italic mt-1 ml-28">{errors.general}</p>}

          <div className="flex justify-center mt-6">
            <button
            className="text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 mr-4"
            style={{ backgroundColor: "#F21313" }}
              type="submit"
            >
              Update
            </button>
            <button
                            className="bg-gray-500 w-full md:w-28 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"

              type="button"
              onClick={() => {
                onClose(); 
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
