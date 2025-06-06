import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../images/Logo.png';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || ""}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed");
        return;
      }
      const data = await response.json();
      // Save JWT token if needed: localStorage.setItem("token", data.jwtToken);
      // Redirect or update UI as needed
      alert("Login successful!");
      navigate('/chatModule');
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-100">
          <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
        </div>
        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Login to Your Account</h2>
          <p className="text-center text-gray-500 mb-6">Join Our ChatSphere application</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="username" hidden>Username</label>
                <input
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  id="username"
                  placeholder="Enter your username/mobile number"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="password" hidden>Password</label>
                <input
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline bg-transparent p-0 m-0 border-0 outline-none"
                onClick={() => navigate('/forgetpassword')}
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 mb-2"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;