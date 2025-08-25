import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';

const FestivalTemplateDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFestival } = location.state || {}; // Get state from navigation

  const handleBack = () => {
    navigate(-1); // Go back to the previous page (FestivalEDMs)
  };

  return (
    
      <div style={{ padding: '20px' }}>
        <h2>Festival EDM Template</h2>
        {selectedFestival ? (
          <div>
            <h3>Selected Festival: {selectedFestival}</h3>
            {/* You would render the actual template content here based on selectedFestival */}
            <p>Displaying content for {selectedFestival}...</p>
            {/* Example: <img src={`/images/festival-templates/${selectedFestival}.jpg`} alt={selectedFestival} /> */}
          </div>
        ) : (
          <p>No festival template selected.</p>
        )}
        <button onClick={handleBack} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Back to Festival EDMs
        </button>
      </div>
    
  );
};

export default FestivalTemplateDisplay;
