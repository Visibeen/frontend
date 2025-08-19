import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './UploadLogo.css';
import visibenLogo from './VISIBEN.svg';

const UploadLogo = () => {
  const navigate = useNavigate();
  const { uploadLogo, uploadedLogo, loadAccountInfo, skipLogo } = useAccount();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load account info when component mounts
  React.useEffect(() => {
    loadAccountInfo();
    console.log('UploadLogo: Loading account info and logo');
  }, [loadAccountInfo]);

  // Debug: Log when uploadedLogo changes
  React.useEffect(() => {
    console.log('UploadLogo: uploadedLogo changed:', uploadedLogo ? 'Logo loaded' : 'No logo');
  }, [uploadedLogo]);

  // Cleanup preview URL when component unmounts or file changes
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSkip = () => {
    skipLogo(); // Mark that logo was skipped
    navigate('/select-design');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      await uploadLogo(selectedFile);
      navigate('/select-design');
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Error uploading logo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePurchaseLogo = () => {
    navigate('/purchase-logo');
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
  <DashboardLayout>
    <div className="upload-card">
      <div className="upload-title">Upload Logo</div>
      <div className="upload-desc">Upload your business logo to appear on all your marketing materials</div>
      
      <div className="upload-drop">
        <i className="fa fa-upload"></i>
          <div className="upload-drop-text">
            Drag & drop file or <span className="browse-link" style={{ color: '#0096e6', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleBrowseClick}>Browse</span>
            <input
              type="file"
              accept=".jpg,.jpeg,.svg,.png"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        <div className="upload-support">Supported format : jpg, svg, png etc.</div>
          {selectedFile && (
            <div style={{ marginTop: 15, textAlign: 'center' }}>
              <div style={{ color: '#222', fontSize: 13, marginBottom: 10 }}>
                Selected file: {selectedFile.name}
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                border: '2px dashed #dee2e6', 
                borderRadius: '8px', 
                padding: '15px', 
                margin: '10px 0',
                display: 'inline-block'
              }}>
                <h5 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>Preview:</h5>
                <img 
                  src={previewUrl} 
                  alt="Selected Logo Preview" 
                  style={{ 
                    maxWidth: '150px', 
                    maxHeight: '80px', 
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }} 
                />
              </div>
            </div>
          )}
      </div>
      <div className="upload-actions">
          <button className="btn-skip" onClick={handleSkip}>Skip</button>
          <button 
            className={`btn-upload ${selectedFile ? 'btn-upload-active' : ''}`} 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? 'Uploading...' : selectedFile ? 'Upload Logo' : 'Select a file first'}
          </button>
      </div>
      <div className="upload-purchase">
          Don't have a Logo? <a href="#" onClick={handlePurchaseLogo}>Click here to purchase your logo</a>
      </div>
    </div>
  </DashboardLayout>
  );
};

export default UploadLogo; 