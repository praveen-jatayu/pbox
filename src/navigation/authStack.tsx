import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, View} from 'react-native';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';
import Login from '../screens/login/login';
import Otp from '../screens/otp/otp';
import TermsAndCondition from '../screens/policy/termsAndCondition';
import PrivacyPolicy from '../screens/policy/privacyPolicy';
import ProfileName from '../screens/profile/profileName';
import {AuthStackParamList} from './navigationTypes';
import { COLORS } from '../constants/color';
import { version } from 'moment';
import { verticalScale } from 'react-native-size-matters';


const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  
   const CustomSafeAreaView = ({children, excludeSafeArea}) => {
      return excludeSafeArea ? (
        <View style={{flex: 1}}>{children}</View>
      ) : (
        <>
          {/* Top SafeAreaView for status bar background color */}
          <SafeAreaView style={{backgroundColor: '#ffffff'}} />
  
          {/* Main content */}
          <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
        </>
      );
    };
  return (
    <>
       
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
 
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
      
      
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP"
          component={Otp}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndCondition}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="ProfileName"
            component={props => (
                     <CustomSafeAreaView excludeSafeArea={false}>
                       <ProfileName {...props} />
                     </CustomSafeAreaView>
                   )}
          options={{
            headerShown: false,
          }}

        />
          
        
      </Stack.Navigator>  
   
    </>
  );
};

export default AuthStack;
