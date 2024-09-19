import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password1: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sign-up', formData);
            if (response.status === 201) {
                setSuccess('Account created successfully!');
                setError('');
            }
        } catch (err) {
            setError('Error creating account');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password1}
                    onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password2}
                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                />
                <button type="submit">Sign Up</button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </div>
    );
};

export default SignUp;
