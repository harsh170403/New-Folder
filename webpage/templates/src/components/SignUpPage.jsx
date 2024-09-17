import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password1: '',
    password2: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/sign-up', form)
      .then(response => alert(response.data.message))
      .catch(error => console.error('Error signing up:', error));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password1" value={form.password1} onChange={handleChange} placeholder="Password" required />
        <input type="password" name="password2" value={form.password2} onChange={handleChange} placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
