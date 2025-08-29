import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAccount } from './AccountContext';
import WelcomeSection from './components/WelcomeSection';
import SelectDesignSection from './components/SelectDesignSection';
import { mockRootProps } from './selectDesignMockData';

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  minHeight: '100vh',
  padding: '32px 40px'
}));

const SelectDesignPage = () => {
  const navigate = useNavigate();
  const { accountInfo } = useAccount();
  
  // Use account info from context, fallback to mock data
  const displayAccountInfo = accountInfo?.businessName ? accountInfo : mockRootProps.accountInfo;
  
  const handleDesignSelect = (design) => {
    console.log('Selected design:', design);
    navigate('/get-edms/font-style');
  };

  return (
    <PageContainer>
      <WelcomeSection />
      <SelectDesignSection 
        designs={mockRootProps.designs}
        onDesignSelect={handleDesignSelect}
        accountInfo={displayAccountInfo}
      />
    </PageContainer>
  );
};

export default SelectDesignPage;