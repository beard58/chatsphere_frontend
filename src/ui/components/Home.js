import { useNavigate } from "react-router-dom";

function Home () {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-red-50 mb-2">Welcome to the Home Page</h1>
      <p className="mb-6">This is the home page of our application.</p>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
          onClick={() => navigate('/registration')}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;