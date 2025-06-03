import axios from 'axios';
import Image from '../../images/TeamMeeting.png';
import { useState } from 'react';

function Registration() {

    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('API URL:', apiUrl);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        role:"user"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
            const response = await axios.post(`${apiUrl}auth/register`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 px-4">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">

                <div className="md:w-1/2 w-full">
                    <img src={Image} alt="Team Meeting" className="w-full h-full object-cover" />
                </div>

                <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Join our AI Chat Community</h1>
                    <p className="text-sm text-gray-600 mb-6 text-center">Join our AI Chat Community</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            onChange={handleChange}
                            value={formData.fullName}
                            name="fullName"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            onChange={handleChange}
                            value={formData.email}
                            name="email"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            onChange={handleChange}
                            value={formData.mobileNumber}
                            required
                            name="mobileNumber"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
