import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png';


const Sidebar = () => {
  const [performanceOpen, setPerformanceOpen] = useState(false);
  const [reputationOpen, setReputationOpen] = useState(false);

  return (
    <div className="sidebar">


      <ul className="sidebar-top">
        <li><Link to="/dashboard">Overview</Link></li>
        <li>
          <span onClick={() => setPerformanceOpen(!performanceOpen)}>Performance ▾</span>
          {performanceOpen && (
            <ul>
              <li>Performance 1</li>
              <li>Performance 2</li>
            </ul>
          )}
        </li>
        <li>
          <span onClick={() => setReputationOpen(!reputationOpen)}>Reputation Management ▾</span>
          {reputationOpen && (
            <ul>
              <li>Review Insights</li>
              <li>Respond Reviews</li>
            </ul>
          )}
        </li>
        <NavLink to="/get-edms" className="...">Get EDMs</NavLink>
        <li>Free Website</li>
      </ul>

      <ul className="sidebar-bottom">
        <li>Blogs</li>
        <li>Social Media</li>
        <li>Refer & Earn</li>
        <li>My Account</li>
      </ul>
    </div>
  );
};

export default Sidebar;