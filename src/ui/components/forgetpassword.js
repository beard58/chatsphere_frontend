function ForgetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side illustration (logo) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-100">
          <img src="/img/Logo.png" alt="Logo" className="w-40 h-40 object-contain" />
        </div>
        {/* Right side form */}
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
                />
              </div>
              <div>
                <input
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                />
              </div>
              <div>
                <input
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  id="new-password"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 mb-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
