import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordPage = () => {
  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = 1; 
    axios.post(`/api/change-password/${userId}`, form)
      .then(response => alert(response.data.message))
      .catch(error => console.error('Error changing password:', error));
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <input type="password" name="current_password" value={form.current_password} onChange={handleChange} placeholder="Current Password" required />
        <input type="password" name="new_password" value={form.new_password} onChange={handleChange} placeholder="New Password" required />
        <input type="password" name="confirm_new_password" value={form.confirm_new_password} onChange={handleChange} placeholder="Confirm New Password" required />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
