import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/profile/${localStorage.getItem('userId')}`);
                setProfile(response.data);
            } catch (err) {
                console.log('Error fetching profile');
                navigate('/');
            }
        };
        fetchProfile();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between">
                    <h1 className="text-lg font-semibold">My Dashboard</h1>
                    <div>
                        <Link to="/" className="px-4 py-2 mx-2 hover:bg-blue-700">Home</Link>
                        <Link to="/profile" className="px-4 py-2 mx-2 hover:bg-blue-700">Profile</Link>
                        <Link to="/settings" className="px-4 py-2 mx-2 hover:bg-blue-700">Settings</Link>
                        <Link to="/login" className="px-4 py-2 mx-2 bg-blue-500 rounded hover:bg-blue-700">Login</Link>
                        <Link to="/sign-up" className="px-4 py-2 mx-2 bg-green-500 rounded hover:bg-green-700">Sign Up</Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto mt-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {profile.username}!</h2>
                    <p className="text-gray-600 mb-2">Email: {profile.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
