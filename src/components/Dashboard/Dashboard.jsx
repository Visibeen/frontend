import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Layouts/Sidebar';
import Footer from '../Layouts/Footer';
import logo from '../../assets/VisibeenLogo.png';

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

  const getStatusIcon = (status) => {
    if (status === 'Verified') return '✓';
    if (status === 'Unverified') return '!';
    return '✕';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={logo} alt="Visibeen" className="header-logo" />
      </div>
      <div className="dashboard-main-content">
        <div className="dashboard-sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active"><a href="#"><span className="nav-icon">🏠</span>Overview</a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">📊</span>Performance</a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">⭐</span>Reputation Management</a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">📧</span>Get EDMs</a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">🌐</span>Free Website</a></li>
          </ul>
          <ul className="bottom-nav">
            <li className="nav-item"><a href="#"><span className="nav-icon">📱</span>Whats app <span className="coming-soon">Coming soon</span></a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">📝</span>Blogs <span className="coming-soon">Coming soon</span></a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">📱</span>Social Media <span className="coming-soon">Coming soon</span></a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">🎁</span>Refer & Earn</a></li>
            <li className="nav-item"><a href="#"><span className="nav-icon">👤</span>My Account</a></li>
          </ul>
        </nav>
      </div>
      <div className="dashboard-main">
        <div className="businesses-section">
          <h2 className="section-title">Businesses</h2>
          <p className="section-description">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.</p>
          
          <div className="businesses-table">
            <div className="table-header">
              <div className="header-cell">Business</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Optimization score</div>
              <div className="header-cell"></div>
            </div>
            
            {mockBusinesses.map((biz) => (
              <div className="table-row" key={biz.id}>
                <div className="business-cell">
                  <div className="business-name">{biz.name}</div>
                  <div className="business-address">{biz.address}</div>
                </div>
                <div className="status-cell">
                  <div className={`status-indicator ${getStatusClass(biz.status)}`}>
                    <span className="status-icon">{getStatusIcon(biz.status)}</span>
                    <span className="status-text">{biz.status}</span>
                  </div>
                </div>
                <div className="score-cell">
                  {biz.status === 'Suspended' ? (
                    <a href="#" className="check-now">Check now</a>
                  ) : (
                    <span className="score-text">{biz.score}</span>
                  )}
                </div>
                <div className="action-cell">
                  <button className="view-profile-btn" onClick={() => navigate(`/profile/${biz.id}`)}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src={logo} alt="Visibeen" className="footer-logo" />
            <p>Copyright © 2025 e2e digitech pvt ltd.</p>
            <p>All rights reserved</p>
            <div className="social-icons">
              <a href="#" className="social-icon">ⓕ</a>
              <a href="#" className="social-icon">ⓣ</a>
              <a href="#" className="social-icon">ⓘ</a>
              <a href="#" className="social-icon">ⓨ</a>
            </div>
          </div>
          <div className="footer-columns">
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Testimonials</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help center</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Legal</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Status</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Stay up to date</h3>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button type="submit">→</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;