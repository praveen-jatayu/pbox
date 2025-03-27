import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, Settings, StatusBar} from 'react-native';
import BottomNav from './bottomNav';
import ProfileScreen from '../screens/profile/profileScreen';
import NotificationScreen from '../screens/notification/notificationScreen';
import ClientReview from '../screens/clientReview/clientReview';
import EditProfile from '../screens/profile/editProfile';
import SettingsScreen from '../screens/profile/settings';
import DeleteAccount from '../screens/profile/deleteAccount';
import BoxDetail from '../screens/boxDetail/boxDetail';
import BookingConfirmation from '../screens/bookings/bookingConfirmation';
import SlotBooking from '../screens/bookings/slotBooking';
import AddRatingAndReview from '../screens/clientReview/addRatingAndReview';
import BookingDetail from '../screens/bookings/bookingDetail';
import SelectLocation from '../screens/selectLocation/selectLocation';
import {AppStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = ({route}) => {
  console.log('route', route);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectLocation"
            component={SelectLocation}
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
            name="BoxDetail"
            component={BoxDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookingDetail"
            component={BookingDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SlotBooking"
            component={SlotBooking}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingConfirmation}
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
          <Stack.Screen
            name="AddRatingAndReview"
            component={AddRatingAndReview}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </>
  );
};

export default AppStack;
