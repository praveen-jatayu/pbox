import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNav from './src/navigation/appNav';
import { AuthProvider } from './src/context/authContext';



const App = () => {
  
  return (
  <AuthProvider>
  <AppNav/>
  </AuthProvider>

  
  )
}

export default App