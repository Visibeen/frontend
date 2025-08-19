import React from 'react';
import { useAccount } from './AccountContext';
import ImageWithAccountInfo from './ImageWithAccountInfo';
import './AccountInfoDemo.css';

const AccountInfoDemo = () => {
  const { accountInfo } = useAccount();

  const demoImages = [
    'car1.jpg',
    'car2.jpg', 
    'car3.jpg',
    'home.jpg',
    'hand.jpg',
    'crackers.jpg'
  ];

  const positions = [
    'bottom-right',
    'bottom-left', 
    'top-right',
    'top-left',
    'center'
  ];

  return (
    <div className="account-info-demo">
      <div className="demo-header">
        <h1>Account Information on Images</h1>
        <p>Your business information will be displayed on all images. Here's how it looks:</p>
        
        {accountInfo.businessName ? (
          <div className="account-summary">
            <h3>Current Account Information:</h3>
            <div className="info-grid">
              <div><strong>Business:</strong> {accountInfo.businessName}</div>
              <div><strong>Website:</strong> {accountInfo.website}</div>
              <div><strong>Contact:</strong> {accountInfo.contact}</div>
              <div><strong>Alt Contact:</strong> {accountInfo.altContact}</div>
              <div><strong>Address:</strong> {accountInfo.address}</div>
            </div>
          </div>
        ) : (
          <div className="no-account-info">
            <p>⚠️ No account information found. Please fill in your account details first.</p>
          </div>
        )}
      </div>

      <div className="demo-sections">
        <div className="demo-section">
          <h2>Different Positions</h2>
          <p>Account information can be positioned in different locations on the image:</p>
          
          <div className="position-examples">
            {positions.map((position) => (
              <div key={position} className="position-example">
                <h4>{position.replace('-', ' ').toUpperCase()}</h4>
                <ImageWithAccountInfo
                  imageSrc={require(`./${demoImages[0]}`)}
                  position={position}
                  showBusinessName={true}
                  showWebsite={true}
                  showContact={true}
                  showAddress={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="demo-section">
          <h2>Different Images</h2>
          <p>Account information appears consistently across all your images:</p>
          
          <div className="image-examples">
            {demoImages.map((image, index) => (
              <div key={image} className="image-example">
                <h4>Image {index + 1}</h4>
                <ImageWithAccountInfo
                  imageSrc={require(`./${image}`)}
                  position="bottom-right"
                  showBusinessName={true}
                  showWebsite={true}
                  showContact={true}
                  showAddress={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="demo-section">
          <h2>Customizable Display Options</h2>
          <p>You can choose which information to display:</p>
          
          <div className="customization-examples">
            <div className="customization-example">
              <h4>Business Name Only</h4>
              <ImageWithAccountInfo
                imageSrc={require(`./${demoImages[1]}`)}
                position="bottom-right"
                showBusinessName={true}
                showWebsite={false}
                showContact={false}
                showAddress={false}
              />
            </div>
            
            <div className="customization-example">
              <h4>Contact Information Only</h4>
              <ImageWithAccountInfo
                imageSrc={require(`./${demoImages[2]}`)}
                position="bottom-right"
                showBusinessName={false}
                showWebsite={false}
                showContact={true}
                showAddress={false}
              />
            </div>
            
            <div className="customization-example">
              <h4>Website & Address</h4>
              <ImageWithAccountInfo
                imageSrc={require(`./${demoImages[3]}`)}
                position="bottom-right"
                showBusinessName={false}
                showWebsite={true}
                showContact={false}
                showAddress={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoDemo; 