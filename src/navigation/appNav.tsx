import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './authStack';
import AppStack from './appStack';
import SplashScreen from '../screens/splashScreen/splashScreen';

function AppNav() {
  const [isSplashVisible, setIsSplashVisible] = useState(true); // Show splash initially

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
          <SplashScreen /> // Show splash if loading
        ) : (
          <AuthStack /> // Show main navigation after 3 sec
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNav;
