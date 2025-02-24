import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Settings, StatusBar } from 'react-native';
import BottomNav from './bottomNav';
import SelectCity from '../screens/selectCity/selectCity';
import ProfileScreen from '../screens/profile/profileScreen';
import NotificationScreen from '../screens/notification/notificationScreen';
import CourtDetail from '../screens/courtDetails/courtDetail';
import ClientReview from '../screens/clientReview/clientReview';
import EditProfile from '../screens/profile/editProfile';
import SettingsScreen from '../screens/profile/settings';
import DeleteAccount from '../screens/profile/deleteAccount';

const Stack = createNativeStackNavigator();

const AppStack = () => {


  return (
  <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    
      <Stack.Navigator screenOptions={{ headerShown: false ,animation:'fade_from_bottom'}}  >
        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectCity"
          component={SelectCity}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CourtDetail"
          component={CourtDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ClientReview"
          component={ClientReview}
          options={{
            headerShown: false,
          }}
        />
        
        </Stack.Navigator>
       
      </>
  );
};

export default AppStack;
