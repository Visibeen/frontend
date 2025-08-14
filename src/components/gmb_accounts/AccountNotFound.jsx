import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png';
import IllustrationSection from './IllustrationSection';
import ContentSection from './ContentSection';
import ActionButtons from './ActionButtons';
import HelpLink from './HelpLink';

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#0B91D6',
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  padding: '0 30px'
}));

const HeaderLogo = styled('img')(({ theme }) => ({
  height: '40px',
  width: 'auto'
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px'
}));

const MainContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  padding: '40px',
  maxWidth: '569px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px'
}));

// Modal styles for existing functionality
const ModalOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto'
}));

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

  const navigate = useNavigate();

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

  const handleCreateAccount = () => {
    console.log('Create Account clicked');
    openModal();
  };

  const handleTakeHelpOfExpert = () => {
    console.log('Take Help Of Expert clicked');
    goToContactUs();
  };

  const handleUnableToTrace = () => {
    console.log('Unable to trace account clicked');
    setShowModal(true);
  };

  return (
    <PageContainer>
      <HeaderSection>
        <HeaderLogo src={logo} alt="Visibeen" />
      </HeaderSection>
      
      <ContentArea>
        <MainContent>
          <IllustrationSection />
          <ContentSection />
          <ActionButtons 
            onCreateAccount={handleCreateAccount}
            onTakeHelpOfExpert={handleTakeHelpOfExpert}
          />
          <HelpLink onClick={handleUnableToTrace} />
        </MainContent>
      </ContentArea>

      {/* Existing Modal Functionality */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <button
                onClick={currentStep === 1 ? closeModal : () => goToStep(currentStep - 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#0B91D6'
                }}
              >
                ← Back
              </button>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ 
              width: '100%', 
              height: '4px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '2px',
              marginBottom: '32px'
            }}>
              <Box sx={{ 
                width: getProgressWidth(),
                height: '100%',
                backgroundColor: '#0B91D6',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </Box>

            {/* Content */}
            <Box sx={{ textAlign: 'center' }}>
              <h2 style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#121927',
                marginBottom: '16px'
              }}>
                {stepContent[currentStep].title}
              </h2>
              
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#30302e',
                marginBottom: '32px'
              }}>
                {stepContent[currentStep].description}
              </p>

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleAnswer(currentStep, 'Yes')}
                  style={{
                    backgroundColor: '#0B91D6',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(currentStep, 'No')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#0B91D6',
                    border: '1px solid #0B91D6',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  No
                </button>
              </Box>
            </Box>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#0B91D6'
                }}
              >
                ← Back
              </button>
            </Box>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              color: '#121927',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              You want to take claim from existing profile?
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#30302e',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
            </p>
            <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowSearchModal(true);
                }}
                style={{
                  backgroundColor: '#0B91D6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Yes
              </button>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#0B91D6',
                  border: '1px solid #0B91D6',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                No
              </button>
            </Box>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* GMB Search Modal */}
      {showSearchModal && (
        <ModalOverlay>
          <ModalContent>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <button 
                onClick={() => setShowSearchModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#0B91D6'
                }}
              >
                ← Back
              </button>
            </Box>
            
            <Box sx={{ 
              position: 'relative',
              marginBottom: '24px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="search GMB profile"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </Box>

            <Box>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: '#121927',
                marginBottom: '16px'
              }}>
                Your search results
              </h3>
              
              {searchResults.length > 0 && (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {searchResults.map((result, index) => (
                    <Box
                      key={result.id || index}
                      onClick={() => handleSelectProfile(result)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        backgroundColor: selectedProfile?.id === (result.id || '') ? '#f0f9ff' : 'transparent',
                        '&:hover': {
                          backgroundColor: '#f9fafb'
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProfile?.id === (result.id || '')}
                        onChange={() => handleSelectProfile(result)}
                      />
                      <Box>
                        <div style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#121927'
                        }}>
                          {result.name || result.businessName}
                        </div>
                        {result.formattedAddress && (
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            color: '#6b7280'
                          }}>
                            {result.formattedAddress}
                          </div>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {showEmptyState && (
                <Box sx={{ textAlign: 'center', padding: '40px 20px' }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    No results found. Try a different search term.
                  </p>
                </Box>
              )}

              {selectedProfile && (
                <Box sx={{ marginTop: '24px', textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setShowSearchModal(false);
                      navigate('/contact-us', { state: { selectedPlace: selectedProfile } });
                    }}
                    style={{
                      backgroundColor: '#0B91D6',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Next
                  </button>
                </Box>
              )}
            </Box>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default AccountNotFound;