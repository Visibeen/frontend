import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../styles.css';
import logo from '../../../../assets/VisibeenLogo.png';


import Layout from '../../../Layouts/Layout';

const UploadLogo = () => {
  const [logo, setLogo] = useState(null);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!logo) {
      alert("Please select a logo first.");
      return;
    }

    
    const formData = new FormData();
    formData.append("logo", logo);

    fetch("/api/upload-logo", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Upload success:", data);
        // Navigate to next page if needed
      })
      .catch((err) => console.error("Upload failed:", err));
  };

  return (
    <Layout>
    <div className="page-wrapper">
      <div className="header-section">
        <img src={logo} alt="logo" className="logo"/>
        <p>Welcome</p>
        <h1 className="company-name">E2E Digitech Pvt Ltd</h1>
      </div>

      <div className="card">
        <h2>Upload Logo</h2>
        <p className="subtext">
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </p>

        <div className="upload-box">
          <div className="upload-icon">&#8679;</div>
          <p>
            Drag & drop file or <label className="browse-link">
              Browse <input type="file" hidden onChange={handleFileChange} />
            </label>
          </p>
          <p className="file-format">Supported format : jpg, svg, png etc.</p>
        </div>

        <div className="btn-group">
          <button className="btn cancel">Skip</button>
          <button className="btn primary" onClick={handleUpload}>
            Upload Logo
          </button>
        </div>

        <p className="purchase-link">
          Don't have a Logo? <a href="#">Click here to purchase your logo</a>
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default UploadLogo;
