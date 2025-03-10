import { View, Text, BackHandler } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPost, saveAuthToken } from '../services/apiService/apiService';
import { API_ENDPOINTS } from '../constants/apiEndPoinst';



export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState('');
  

  const login = async (mobileNo,registerNewUser) => {
  
    try {
      // let fcmToken = await AsyncStorage.getItem('fcmToken');

      const formData = new FormData();
      formData.append('mobile_no', mobileNo);
     
      const response = await apiPost(API_ENDPOINTS.AUTH.LOGIN, formData);

      if (response.success) {
        const userInfo = response.data;
        console.log(userInfo)
       

        if (userInfo.user === 'New') {
        
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          registerNewUser(userInfo);
         
        }
        else{
       
        setUserInfo(userInfo); // Assuming `setUserInfo` is in scope
        setUserToken(userInfo.api_token); // Assuming `setUserToken` is in scope
        
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        await saveAuthToken(userInfo.api_token);
        }   
      } else {
        setLoginError(response.message); // Assuming `setLoginError` is in scope
      }

     
    } catch (error) {
      setLoginError('Invaild username or password');
      console.error('Login Error:', error);
     
    }
    finally{
    
        setIsLoading(false); // Ensure loading stops only for old users
      
    }
  };

  
  
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('authToken');
      let userInfo = await AsyncStorage.getItem('userInfo');

      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
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
    value={{ login, logout, isLoading, userToken,userInfo,setUserToken,setUserInfo, loginError }}>
    {children}
  </AuthContext.Provider>
  )
}



