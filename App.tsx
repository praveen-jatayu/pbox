import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNav from './src/navigation/appNav';
import { PaperProvider } from 'react-native-paper';


const App = () => {
  
  return (
  <PaperProvider>
  <AppNav/>
  </PaperProvider>
  
  )
}

export default App