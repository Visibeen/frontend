import React from 'react';
import { Routes, Route, useRoutes, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme';
import DashboardLayout from '../Layouts/DashboardLayout';
import SelectEDM from './visibeen/SelectEDM';
import SelectDesign from './visibeen/SelectDesign';
import AccountInfo from './visibeen/AccountInfo';
import UploadLogo from './visibeen/UploadLogo';
import FontStyleSelection from '../Create_Post/FontStyleSelection'; 
import PurchaseLogo from './visibeen/PurchaseLogo';
import ProductsEDMs from './visibeen/ProductsEDMs';
import FestivalEDMs from './visibeen/FestivalSpecialEDMs';
import SpecialDaysEDMs from './visibeen/SpecialDaysEDMs';
import SpecialDaysPhotoEDMs from './visibeen/SpecialDaysPhotoEDMs';
import ProductTemplateDisplay from './visibeen/ProductTemplateDisplay';
import FestivalTemplateDisplay from './visibeen/FestivalTemplateDisplay';
import { AccountProvider } from './visibeen/AccountContext';

const createEmotionCache = () => { // Yet another dummy edit to trigger re-compilation
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

function EDMsFlow() {
  const routes = useRoutes([
    {
      path: '/account-info', // Initial path for /get-edms
      element: <AccountInfo />,
    },
    {
      path: '/upload-logo', 
      element: <UploadLogo />,
    },
    {
      path: '/select-edm', 
      element: <SelectEDM />,
    },
    {
      path: '/products-edms',
      element: <ProductsEDMs />,
    },
    {
      path: '/festival-edms',
      element: <FestivalEDMs />,
    },
    {
      path: '/special-days-edms',
      element: <SpecialDaysEDMs />,
    },
    {
      path: '/special-days-photo-edms',
      element: <SpecialDaysPhotoEDMs />,
    },
    {
      path: '/product-template-display',
      element: <ProductTemplateDisplay />,
    },
    {
      path: '/festival-template-display',
      element: <FestivalTemplateDisplay />,
    },
    {
      path: '/select-design', 
      element: <SelectDesign />,
    },
    {
      path: '/font-style', 
      element: <FontStyleSelection />,
    },
    {
      path: '/purchase-logo',
      element: <PurchaseLogo />,
    },
    {
      path: '/', // Default route for /get-edms will redirect to /get-edms/account-info
      element: <AccountInfo />,
    },
    {
      path: '*' , // Catch-all for any other sub-routes, redirects to account-info
      element: <AccountInfo />
    }
  ]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DashboardLayout>
          <AccountProvider>
            {routes}
          </AccountProvider>
        </DashboardLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default EDMsFlow;
