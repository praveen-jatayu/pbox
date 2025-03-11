import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import AppNav from './src/navigation/appNav';
import { AuthProvider } from './src/context/authContext';
import Toast, { BaseToast, ErrorToast,SuccessToast } from 'react-native-toast-message';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FONTS } from './src/constants/font';


const App = () => {

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <SuccessToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: moderateScale(15),
          fontFamily:FONTS.nunitoMedium
        }}
        text2Style={{
          fontFamily:FONTS.nunitoMedium,
          fontSize: moderateScale(14)
        }}
      />
    ),
    
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red' ,elevation:4,height:verticalScale(50)}}
        contentContainerStyle={{ paddingHorizontal: scale(12)}}
        text1Style={{
          fontSize: moderateScale(15),
          fontFamily:FONTS.nunitoMedium
        }}
        text2Style={{
          fontFamily:FONTS.nunitoMedium,
          fontSize: moderateScale(13)
        }}
      />
    ),
  
  };
  
  return (
    <>
  <AuthProvider>
  <AppNav/>
 
  </AuthProvider>
  <Toast config={toastConfig} position='bottom' />
  </>
  
  )
}

export default App