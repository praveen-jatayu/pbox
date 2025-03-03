import { View, Text, BackHandler } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
// import { apiPost, clearAuthToken, saveAuthToken } from '../services/api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { apiPost, clearAuthToken, saveAuthToken } from '../services/env/apiUtility';


export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState('');
  let backHandlerListener;

  // const login = async (username, password) => {
  //   setIsLoading(true)
  //   try {
  //     // let fcmToken = await AsyncStorage.getItem('fcmToken');

  //     const formData = new FormData();
  //     formData.append('mobile_no', username);
  //     formData.append('password', password);

  //     // Call the generalized API post function
  //     const response = await apiPost('authenticate-user', formData);

  //     if (response.success) {
  //       const userInfo = response.data;
  //       setUserInfo(userInfo); // Assuming `setUserInfo` is in scope
  //       setUserToken(userInfo.api_token); // Assuming `setUserToken` is in scope

  //       await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  //       // await AsyncStorage.setItem('authToken', userInfo.api_token);
  //       await saveAuthToken(userInfo.api_token);
  //       let token = await AsyncStorage.getItem('authToken');
  //       console.log('tokenContext', token)
  //     } else {
  //       setLoginError(response.message); // Assuming `setLoginError` is in scope
  //     }

     
  //   } catch (error) {
  //     setLoginError('Invaild username or password');
  //     console.error('Login Error:', error);
     
  //   }
  //   finally{
  //     setIsLoading(false)
  //   }
  // };

  const login = async () => {
    const token = 'GuruLogistic';
    await AsyncStorage.setItem('authToken', token);
    setUserToken(token);
  }
  
  // const isLoggedIn = async () => {
  //   try {
  //     setIsLoading(true);
  //     let userToken = await AsyncStorage.getItem('authToken');
  //     let userInfo = await AsyncStorage.getItem('userInfo');

  //     userInfo = JSON.parse(userInfo);
  //     if (userInfo) {
  //       setUserToken(userToken);
  //       setUserInfo(userInfo);
  //     }

  //     setIsLoading(false);
  //   } catch (e) {
  //     console.log('is logged in error $(e)');
  //   }
  // };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setUserToken(token);
      } else {
        setUserToken(null);
      }
      setIsLoading(false);
    } catch (e) {
      console.log('is logged in error $(e)');
    }
  };
  
  const logout = async () => {
    setUserToken(null);
    setUserInfo(null);
    // await clearAuthToken();
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
    setLoginError('');
    
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
    value={{ login, logout, isLoading, userToken, loginError }}>
    {children}
  </AuthContext.Provider>
  )
}

