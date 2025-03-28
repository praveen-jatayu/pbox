import React, { useEffect } from 'react'
import AppNav from './src/navigation/appNav';
import { AuthProvider } from './src/context/authContext';

import { ToastMessage } from './src/components/toastMessage';
import InternetCheck from './src/utils/internetCheck';
import SafeAreaWrapper from './src/utils/safeAreaWrapper';


const App = () => {

  
  return (
    <>
    
  <AuthProvider>
  <InternetCheck>
  
  <AppNav/>

  </InternetCheck>
  </AuthProvider>
  <ToastMessage />

  </>
  
  )
}

export default App