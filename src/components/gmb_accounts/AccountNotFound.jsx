
import React, { useState, useEffect  } from 'react';
import logo from '../../assets/VisibeenLogo.png';
import ANF from '../../assets/Rectangle11.png';
import { useNavigate } from 'react-router-dom';
import ContactUs from './ContactUs';


const AccountNotFound = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const goToContactUs = () => {
    navigate('/contact-us');
  };

 const goToCreateAccountPage = () => {
    navigate('/create-account');
  };
  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // const completeFlow = () => {
  //   alert('Flow completed! You can now proceed with account creation.');
  //   closeModal();
  // };

  const getProgressWidth = () => {
    switch (currentStep) {
      case 1: return '33.33%';
      case 2: return '66.66%'; 
      case 3: return '100%';
      default: return '33.33%';
    }
  };

  const stepContent = {
    1: {
      title: "Is there any suspension you received earlier?",
      description: "Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
    },
    2: {
      title: "Any other profile created with same category same address name and phone number which is not live yet or suspended?",
      description: "Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
    },
    3: {
      title: "Did you have more than once store with same identity?",
      description: "Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
    }
  };

  return (
    <div className="anf-root">
      <div className="anf-header">
        <div className="anf-logo">
          <img src={logo} alt="logo" id='img1' />

          </div>
        </div>

      <div className="anf-center-card">
        <div className="anf-illustration">
          {/* You can put your SVG here */}
        </div>
        <img src={ANF} alt="Account Not Found" className="anf-illustration-img" />
        <h2 className="anf-title">Account Not Found</h2>
        <p className="anf-desc">
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
        </p>

        <div className="anf-actions">

          <button onClick={openModal} className="anf-btn anf-btn-primary" >Create Account</button>
          <button className="anf-btn anf-btn-outline" onClick={goToContactUs}>Take Help Of Expert</button>
        </div>

        <div className="anf-link-row">
          <a
            href="#"
            className="anf-link-danger"
            onClick={e => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            Unable to trace account?
          </a>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <button
                onClick={currentStep === 1 ? closeModal : () => goToStep(currentStep - 1)}
                className="back-button"
              >
                ← Back
              </button>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div 
                className="progress-fill"
                style={{ width: getProgressWidth() }}
              />
            </div> 

            {/* Content */}
            <div className="content-container">
              <h2 className="step-content">
                {stepContent[currentStep].title}
              </h2>
              
              <p className="step-description">
                {stepContent[currentStep].description}
              </p>

              {/* Buttons */}
              <div className="buttons-container">
                <button
                  onClick={currentStep === 3 ? goToCreateAccountPage : () => goToStep(currentStep + 1)}
                  className="button-primary"
                >
                  Yes
                </button>
                <button
                  onClick={currentStep === 3 ? goToCreateAccountPage : () => goToStep(currentStep + 1)}
                  className="button-secondary"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
           )}


      {/* Confirmation Modal */}
      {showModal && (
        <div className="anf-modal-overlay">
          <div className="anf-modal">
            <div className="anf-modal-header">
              <button className="back-button" onClick={() => setShowModal(false)}>
                ← Back
              </button>
            </div>
            <h2 className="anf-modal-title">You want to take claim from existing profile?</h2>
            <p className="anf-modal-desc">
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
            </p>
            <div className="anf-modal-actions">
              <button
                className="anf-btn anf-btn-primary"
                onClick={() => {
                  setShowModal(false);
                  setShowSearchModal(true);
                }}
              >
                Yes
              </button>
              <button className="anf-btn anf-btn-outline" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}


      {/* GMB Search Modal */}
      {showSearchModal && (
        <div className="anf-modal-overlay">
          <div className="anf-modal">
            <div className="anf-modal-header">
              <button className="back-button" onClick={() => setShowSearchModal(false)}>
                ← Back
              </button>
            </div>
            <div className="anf-search-box">
              <span className="anf-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search GMB profile"
                className="anf-search-input"
              />
            </div>
            <div className="anf-modal-actions">
              <button className="anf-btn anf-btn-primary">Search</button>
            </div>

            <div class="search-results" id="searchResults">
              <h3>Your search results</h3>
              <div id="resultsList"></div>
            </div>

            <div class="empty-state" id="emptyState" >
              <p>No results found. Try a different search term.</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Account Pop-ups */}
      <div id="popupModal" class="modal-overlay hidden">
        <div class="modal">
          {/* <!-- Step 1 --> */}
          <div id="step1" class="popup-step">
            <div class="modal-header">
              <button class="back-btn" onclick="closeModal()">
                ← Back
              </button>
            </div>
            <div class="progress-bar">
              <div class="progress-fill step-33"></div>
            </div>
            <div class="modal-content">
              <h2 class="modal-title">Is there any suspension you received earlier?</h2>
              <p class="modal-description">Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.</p>
              <div class="button-group">
                <button class="btn btn-primary" onclick="setPopupStep(2)">Yes</button>
                <button class="btn btn-outline" onclick="setPopupStep(2)">No</button>
              </div>
            </div>
          </div>

          {/* <!-- Step 2 --> */}
          <div id="step2" class="popup-step hidden">
            <div class="modal-header">
              <button class="back-btn" onclick="setPopupStep(1)">
                ← Back
              </button>
            </div>
            <div class="progress-bar">
              <div class="progress-fill step-66"></div>
            </div>
            <div class="modal-content">
              <h2 class="modal-title">Any other profile created with same category same address name and phone number which is not live yet or suspended?</h2>
              <p class="modal-description">Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.</p>
              <div class="button-group">
                <button class="btn btn-primary" onclick="setPopupStep(3)">Yes</button>
                <button class="btn btn-outline" onclick="setPopupStep(3)">No</button>
              </div>
            </div>
          </div>

          {/* <!-- Step 3 --> */}
          <div id="step3" class="popup-step hidden">
            <div class="modal-header">
              <button class="back-btn" onclick="setPopupStep(2)">
                ← Back
              </button>
            </div>
            <div class="progress-bar">
              <div class="progress-fill step-100"></div>
            </div>
            <div class="modal-content">
              <h2 class="modal-title">Did you have more than once store with same identity?</h2>
              <p class="modal-description">Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.</p>
              <div class="button-group">
                <button class="btn btn-primary" onClick={goToContactUs}>Yes</button>
                <button class="btn btn-outline" onclick={goToContactUs}>No</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
}

export default AccountNotFound;
