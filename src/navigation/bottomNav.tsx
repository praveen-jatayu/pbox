import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Animated, StatusBar } from 'react-native';
import Home from '../screens/home/home';
import Bookings from '../screens/bookings/bookings';
import Bookmarks from '../screens/bookmarks/bookmarks';
import { COLORS } from '../constants/colorConstant';
import { icons } from '../constants/IconConstant';
import { FONTS } from '../constants/fontConstant';
import responsive from '../constants/responsive';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = focused ? icons.homeIconActive : icons.homeIconInactive;
              break;
            case 'Booking':
              iconSource = focused ? icons.bookingIconActive : icons.bookingIconInactive;
              break;
            case 'Bookmarks':
              iconSource = focused ? icons.heartIconActive : icons.heartIconInactive;
              break;
            default:
              iconSource = icons.homeIconInactive;
              break;
          }

          return (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image source={iconSource} style={[styles.icon,focused && styles.activeIcon]} />
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightText,
        tabBarLabelStyle: {
        paddingBottom:responsive.padding(10),
          fontSize: responsive.fontSize(13),
          fontFamily: FONTS.nunitoMedium,
        },
        tabBarStyle: {
          height: responsive.height(65),
          paddingTop: responsive.padding(7),
          backgroundColor: COLORS.secondary, // Background color for the bottom bar
          elevation: 20, // Adds shadow effect
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Booking" component={Bookings} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
    </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(9),
    width:moderateScale(48,0.7),
    height:moderateScale(48,0.7)
    // padding: responsive.padding(9),
    // width:responsive.width(45),
    // height:responsive.height(48)
   
  },
  activeIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: responsive.borderRadius(100),
    padding: responsive.padding(8),
    elevation: 5, // Adds shadow for the bump effect
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    transform: [{ translateY: -20 }], // Moves the icon up slightly
  },
  icon: {
    width: responsive.width(25),
    height: responsive.height(25),
    resizeMode: 'contain',
  },
  activeIcon:{
    width: responsive.width(28),
    height: responsive.height(28),
  }
});

export default BottomNav;
