import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const mockBusinesses = [
  {
    id: 1,
    name: 'E2E Networks Limited',
    address: '23 Maplewood Lane, IL 62704, USA',
    status: 'Verified',
    score: '300/500',
  },
  {
    id: 2,
    name: 'E2E Networks Limited',
    address: '23 Maplewood Lane, IL 62704, USA',
    status: 'Unverified',
    score: 'Pending',
  },
  {
    id: 3,
    name: 'E2E Networks Limited',
    address: '23 Maplewood Lane, IL 62704, USA',
    status: 'Suspended',
    score: 'Check now',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    if (status === 'Verified') return 'verified';
    if (status === 'Unverified') return 'unverified';
    return 'suspended';
  };

  return (
    <div className="dashboard">
      {/* <Sidebar /> */}
      <div className="main-content">
        <div className="header-blue">Businesses</div>
        <table>
          <thead>
            <tr>
              <th>Business</th>
              <th>Status</th>
              <th>Optimization Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockBusinesses.map((biz) => (
              <tr key={biz.id}>
                <td>
                  <strong>{biz.name}</strong><br />
                  <span>{biz.address}</span>
                </td>
                <td><span className={`status-badge ${getStatusClass(biz.status)}`}>{biz.status}</span></td>
                <td>{biz.score}</td>
                <td>
                  <button onClick={() => navigate(`/profile/${biz.id}`)}>View profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Dashboard;