import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png';


const Sidebar = () => {
  const [performanceOpen, setPerformanceOpen] = useState(false);
  const [reputationOpen, setReputationOpen] = useState(false);

  return (
    // <div className="sidebar">


    //   <ul className="sidebar-top">
    //     <li><Link to="/dashboard">Overview</Link></li>
    //     <li>
    //       <span onClick={() => setPerformanceOpen(!performanceOpen)}>Performance ▾</span>
    //       {performanceOpen && (
    //         <ul>
    //           <li>Performance 1</li>
    //           <li>Performance 2</li>
    //         </ul>
    //       )}
    //     </li>
    //     <li>
    //       <span onClick={() => setReputationOpen(!reputationOpen)}>Reputation Management ▾</span>
    //       {reputationOpen && (
    //         <ul>
    //           <li>Review Insights</li>
    //           <li>Respond Reviews</li>
    //         </ul>
    //       )}
    //     </li>
    //     <NavLink to="/get-edms" className="...">Get EDMs</NavLink>
    //     <li>Free Website</li>
    //   </ul>

    //   <ul className="sidebar-bottom">
    //     <li>Blogs</li>
    //     <li>Social Media</li>
    //     <NavLink to="/refer-earn" className="...">Refer & Earn</NavLink>
    //     <li>My Account</li>
    //   </ul>
    // </div>

     <nav className="sidebar">
                <NavLink to="/dashboard" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    <span className="nav-text">Overview</span>
                </NavLink>
                <NavLink to="/performance" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    <span className="nav-text">Performance</span>
                </NavLink>
                <NavLink to="/reputation" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="nav-text">Reputation Management</span>
                </NavLink>
                <NavLink to="/get-edms" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"/>
                    </svg>
                       <span className="nav-text">Get EDMs</span>
                </NavLink>
                <NavLink to="/free-website" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.23 0C6.383 13.97 6.089 12.546 6 11H4.083a6.004 6.004 0 002.784 4.118z"/>
                    </svg>
                    <span className="nav-text">Free Website</span>
                </NavLink>

                 <div className="sidebar-bottom">
                <a href="#" className="nav-item">
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
                    </svg>
                    <span className="nav-text">WhatsApp</span>
                    <span className="nav-badge">(Coming Soon)</span>
                </a>
                <a href="#" className="nav-item">
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                    <span className="nav-text">Blogs</span>
                    <span className="nav-badge">(Coming Soon)</span>
                </a>
                <a href="#" className="nav-item">
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                    <span className="nav-text">Social Media</span>
                    <span className="nav-badge">(Coming Soon)</span>
                </a>
                <NavLink to="/refer-earn" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-1.092a4.535 4.535 0 001.676-.662C13.398 12.766 14 11.991 14 11c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 8.092V6.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V4z"/>
                    </svg>
                     <span className="nav-text">Refer & Earn</span>
                </NavLink>
                <NavLink to="/my-account" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                    <span className="nav-text">My Account</span>
                </NavLink>
                </div>
            </nav>

  );
};

export default Sidebar;