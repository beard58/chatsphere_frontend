import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to the Dashboard</h1>
        <p className="text-gray-700 mb-8">You have successfully logged in to ChatSphere!</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
