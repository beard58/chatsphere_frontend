import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../images/Logo.png'
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVerify, setisVerify] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSent, setIsSent] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/forgetpassword`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        alert("OTP sent to your email");
        setIsOtpSent(true);
        setIsSent(false);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      alert("An error occurred while sending OTP");
    }

  }

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`${apiUrl}/otp/validateotp`, {email, otp}, {
        headers: { 
          'Content-Type': 'application/json',
        },
        });
      if (response.status === 200) {
        alert("Password reset successfully");
        setisVerify(true);
        setIsOtpSent(false);
        setIsSent(false);

      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while resetting password");
    }

  }

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/updatingPassword`, { email, newPassword }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        alert("Password reset successfully");
        setisVerify(false);
        setIsOtpSent(false);
        setIsSent(false);

      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred while resetting password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-100">
          <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Reset Your Password</h2>
          <p className="text-center text-gray-500 mb-6">Enter your email, OTP, and new password</p>
          <form>
            <div className="mb-4 flex flex-col gap-4">
              <div>
                <input
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {isOtpSent && (
                <div>
                  <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              {isVerify && (
                <div>
                  <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    id="new-password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              )}

            </div>
            {isSent && (
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 mb-2"

                onClick={sendOtp}
              >
                Send OTP
              </button>)}

            {isOtpSent && (
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 mb-2"
                onClick={verifyOtp}
              >
                Reset Password
              </button>
            )}
            {isVerify && (
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 mb-2"
                onClick={resetPassword}
              >
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
