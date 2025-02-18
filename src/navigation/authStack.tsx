import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import login from '../screens/login/login';
import otp from '../screens/otp/otp';
import profileName from '../screens/profile/profileName';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';



const Stack = createNativeStackNavigator();

const AuthStack = () => {


  return (
   <>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" /> */}
      <SafeAreaView style={{flex:1, backgroundColor:'#FFFFFF'}}>
      <Stack.Navigator screenOptions={{ headerShown: false , animation:'none'}}>
      <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP"
          component={otp}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="ProfileName"
          component={profileName}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      </SafeAreaView>
      </>
  );
};

export default AuthStack;
