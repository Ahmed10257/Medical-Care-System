import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [success, setSuccess] = useState("");
  const [successConfirm, setSuccessConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Step 1: Verify the old password
      const responseVerify = await axios.post(
        `http://localhost:3000/patient/6678a12a4dbf01704044de71/verify-password`,
        {
          password: oldPassword,
          newPassword: newPassword,
        }
      );

      if (!responseVerify.data) {
        setError("Password verification failed. Please try again.");
        return;
      }

      // Step 2: Verify new password and confirm password match
      if (newPassword !== confirmPassword) {
        setErrorConfirm("Passwords do not match.");
        return;
      }

      // Step 3: If verification succeeds, update the password

      // If everything succeeds
      setSuccess("Password updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to verify or update password. Please try again.");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={changePassword}>
          <div>
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorConfirm && <p style={{ color: "red" }}>{errorConfirm}</p>}
            {successConfirm && (
              <p style={{ color: "green" }}>{successConfirm}</p>
            )}
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
