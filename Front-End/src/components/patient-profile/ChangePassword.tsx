import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { validatePassword } from "../../utils/patient-profile-func";

interface FormPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
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

  const changePassword = async (e: { preventDefault: () => void }) => {
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
      const responseVerify = await axios.post(
        `http://localhost:3000/patient/66792d1e4c73ce610ac03a29/verify-password`,
        {
          password: oldPassword,
          newPassword: newPassword,
        }
      );

      if (!responseVerify.data) {
        setErrors((prev) => ({
          ...prev,
          oldPassword: "Password verification failed. Please try again.",
        }));
        return;
      }

      Swal.fire({
        title: "Success",
        text: "Password updated successfully!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to verify or update password. Please try again.",
      }));
    }
  };

  return (
    <div className="container">
      <div className="bg-white shadow-md rounded-lg text-left pt-0">
        <h1
          className="text-xl font-bold text-center w-full rounded-t-lg border p-1"
          style={{
            background: "#0487D9",
            color: "white",
          }}
        >
          Change Password
        </h1>
        <form onSubmit={changePassword} className="mt-5 p-4 flex flex-col">
          <div className="mb-4">
            <div className="flex flex-col md:flex-row">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 lg:w-56"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <input
                className={`shadow appearance-none border-solid border-2 rounded w-full md:w-8/12 focus:border-blue-400 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
            {errors.oldPassword && (
              <p className="text-red-500 text-xs lg:ml-64 font-bold italic mt-1">
                {errors.oldPassword}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 lg:w-56"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                className={`shadow appearance-none border-solid border-2 rounded w-full md:w-8/12 focus:border-blue-400 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
            {errors.newPassword && (
              <p className="text-red-500 text-xs lg:ml-64 font-bold italic mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row">
              <label
                className="w-full md:w-24 text-gray-700 text-md font-bold mb-2 md:mb-0 lg:w-56"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border-solid border-2 rounded w-full md:w-8/12 focus:border-blue-400 md:ml-4 md:mt-0 mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm your new password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs lg:ml-64 font-bold italic mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-center font-bold italic mt-1">
              {errors.general}
            </p>
          )}
          <div className="flex justify-center flex-col md:flex-row gap-4 md:gap-8 mt-4">
            <button
              className="text-white w-full md:w-28 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              style={{ backgroundColor: "#F21313" }}
              type="submit"
            >
              Update
            </button>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="bg-gray-500 w-full md:w-28 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
