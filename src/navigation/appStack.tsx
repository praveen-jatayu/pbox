import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, Settings, StatusBar, View} from 'react-native';
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

const AppStack = () => {
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
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}> */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
        <Stack.Screen
          name="BottomNav"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <BottomNav {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectLocation"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <SelectLocation {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <ProfileScreen {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <EditProfile {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <SettingsScreen {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <DeleteAccount {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <NotificationScreen {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BoxDetail"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={true}>
              <BoxDetail {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookingDetail"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <BookingDetail {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SlotBooking"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <SlotBooking {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <BookingConfirmation {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ClientReview"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <ClientReview {...props} />
            </CustomSafeAreaView>
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddRatingAndReview"
          component={props => (
            <CustomSafeAreaView excludeSafeArea={false}>
              <AddRatingAndReview {...props} />
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

export default AppStack;
