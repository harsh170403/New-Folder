import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ email: '', username: '' });

  useEffect(() => {
   
    const userId = 1; 
    axios.get(`/api/profile/${userId}`)
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {profile.email}</p>
      <p>Username: {profile.username}</p>
    </div>
  );
};

export default ProfilePage;
