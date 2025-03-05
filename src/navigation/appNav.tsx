import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './authStack';
import AppStack from './appStack';
import SplashScreen from '../screens/splashScreen/splashScreen';
import { AuthContext } from '../context/authContext';


function AppNav() {
  const [isSplashVisible, setIsSplashVisible] = useState(true); // Show splash initially
  const { userToken } = useContext(AuthContext);
  console.log('userToken',userToken)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false); // Hide splash after 3 sec
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      {isSplashVisible ? (
        <SplashScreen />
      ) : userToken!== null ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNav;
