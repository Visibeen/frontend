
import React, { useState, useEffect  } from 'react';
import logo from '../../assets/VisibeenLogo.png';
import ANF from '../../assets/Rectangle11.png';
import { useNavigate } from 'react-router-dom';
import './AccountNotFound.css';


const AccountNotFound = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleAnswer = (question, answer) => {
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);
    
    if (currentStep === 1 && answer === 'Yes') {
      goToStep(2);
    } else if (currentStep === 1 && answer === 'No') {
      goToStep(2);
    } else if (currentStep === 2 && answer === 'No' && newAnswers[1] === 'Yes') {
      navigate('/account-not-found');
      closeModal();
    } else if (currentStep === 2 && answer === 'Yes' && newAnswers[1] === 'Yes') {
      navigate('/account-not-found');
      closeModal();
    } else if (currentStep === 2 && answer === 'No' && newAnswers[1] === 'No') {
      goToStep(3);
    } else if (currentStep === 2 && answer === 'Yes' && newAnswers[1] === 'No') {
      goToStep(3);
    } else if (currentStep === 3 && newAnswers[1] === 'No' && newAnswers[2] === 'No' && answer === 'No') {
      navigate('/create-account');
      closeModal();
    } else if (currentStep === 3) {
      navigate('/account-not-found');
      closeModal();
    } else {
      goToStep(currentStep + 1);
    }
  };
  const navigate = useNavigate();

  const goToContactUs = () => {
    navigate('/contact-us');
  };

 const goToCreateAccountPage = () => {
    navigate('/account-not-found');
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

  const handleSelectProfile = (place) => {
    setSelectedProfile(place);
  };

  const handleSearch = async (q = searchQuery, { silent = false } = {}) => {
    if (!q.trim()) {
      if (!silent) {
        alert('Please enter a search term');
      }
      setSearchResults([]);
      setShowEmptyState(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowEmptyState(false);
    setSearchResults([]);

    try {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'AIzaSyB1M8KDdUFGQJAJamHmpzhYPXBqjuuC_OQ',
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.nationalPhoneNumber,places.types'
        },
        body: JSON.stringify({
          textQuery: q,
          locationBias: {
            circle: {
              center: {
                latitude: 37.7749,
                longitude: -122.4194
              },
              radius: 10000
            }
          }
        })
      });

      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Places API error:', response.status, errorText);
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      const places = Array.isArray(data.places) ? data.places : [];

      const mappedResults = places.map((place) => ({
        name: place?.displayName?.text || place?.displayName || '',
        formattedAddress: place?.formattedAddress || '',
        phone: place?.nationalPhoneNumber || '',
        category: Array.isArray(place?.types) && place.types.length > 0 ? place.types[0] : '',
        location: place?.location || null,
        id: place?.id || ''
      }));

      if (mappedResults.length > 0) {
        setSearchResults(mappedResults);
      } else {
        setShowEmptyState(true);
      }
    } catch (error) {
      console.error('Error searching GMB profiles:', error);
      if (!silent) {
        alert('Error searching profiles. Please try again.');
      }
      setShowEmptyState(true);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearch(searchQuery, { silent: true });
    }, 400);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

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
                  onClick={() => handleAnswer(currentStep, 'Yes')}
                  className="button-primary"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(currentStep, 'No')}
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
            <div className={`anf-search-box ${isSearching ? 'is-searching' : ''}`}>
              <span className="anf-search-icon">🔍</span>
              <input
                type="text"
                placeholder="search GMB profile"
                className="anf-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                aria-label="Search GMB profile"
              />
            </div>
            {/* Auto-search triggers as you type; no explicit Search button */}

            <div className="search-results" id="searchResults">
              <h3 className="anf-results-title">Your search results</h3>
              <div id="resultsList">
                {searchResults.length > 0 && (
                  <div className="results-list">
                    {searchResults.map((result, index) => (
                      <label key={result.id || index} className="result-item" onClick={() => handleSelectProfile(result)}>
                        <input
                          type="checkbox"
                          className="result-checkbox"
                          onChange={() => handleSelectProfile(result)}
                          checked={selectedProfile?.id === (result.id || '')}
                          aria-label={`Select ${result.name || 'place'}`}
                        />
                        <div className="result-texts">
                          <div className="result-name">{result.name || result.businessName}</div>
                          {!!(result.formattedAddress) && (
                            <div className="result-sub">{result.formattedAddress}</div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {showEmptyState && (
              <div className="empty-state" id="emptyState">
                <p>No results found. Try a different search term.</p>
              </div>
            )}

            {selectedProfile && (
              <div className="anf-modal-actions">
                <button
                  className="anf-btn anf-btn-primary"
                  onClick={() => {
                    setShowSearchModal(false);
                    navigate('/contact-us', { state: { selectedPlace: selectedProfile } });
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}



      </div>
    );
}

export default AccountNotFound;
