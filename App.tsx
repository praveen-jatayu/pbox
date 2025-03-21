import React, { useEffect } from 'react'
import AppNav from './src/navigation/appNav';
import { AuthProvider } from './src/context/authContext';

import { ToastMessage } from './src/components/toastMessage';


const App = () => {

  
  return (
    <>
  <AuthProvider>
  <AppNav/>
 
  </AuthProvider>
  <ToastMessage />

  </>
  
  )
}

export default App