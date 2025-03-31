import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar} from 'react-native';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';
import Login from '../screens/login/login';
import Otp from '../screens/otp/otp';
import TermsAndCondition from '../screens/policy/termsAndCondition';
import PrivacyPolicy from '../screens/policy/privacyPolicy';
import ProfileName from '../screens/profile/profileName';
import {AuthStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" /> */}

      <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
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
          component={ProfileName}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
