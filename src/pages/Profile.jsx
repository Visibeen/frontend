import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 30 }}>
      <h2>Business Profile</h2>
      <p>This is a placeholder for business ID: <strong>{id}</strong></p>
    </div>
  );
};

export default Profile;