import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import {COLORS} from '../constants/color'
import * as Animatable from 'react-native-animatable'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/home/home';
import Bookings from '../screens/bookings/bookingList';
import Bookmarks from '../screens/bookmarks/bookmarks';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import mainStyles from '../assets/styles/mainStyles';
import { BottomTabParamList } from './navigationTypes';


const Tab = createBottomTabNavigator<BottomTabParamList>();
const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }
const circle1 = { 0: { scale: 1 }, 0.2: { scale: .10 }, 0.5: { scale: .2 }, 0.10: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }
const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused])
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={styles.container}>
                <View style={[styles.btn]}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle} />
                    <Ionicons name={item.icon} color={focused ? COLORS.secondary : COLORS.primary} size={24} />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={[mainStyles.fontNunitoMedium,mainStyles.primaryTextColor,mainStyles.fontSize12]}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}
export default function AnimTab1({route}) {
    console.log('route',route)
    return (
        <>
             {/* <StatusBar backgroundColor="#ffffff" barStyle="dark-content"/> */}
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ location: route.params?.location,lat:route.params?.lat,long:route.params?.long }}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => (
                            <TabButton {...props} item={{
                                route: 'Home',
                                label: 'Home',
                                icon: 'home',
                            }} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Booking"
                    component={Bookings}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => (
                            <TabButton {...props} item={{
                                route: 'Booking',
                                label: 'Booking',
                                icon: 'newspaper-outline'
                                ,
                            }} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Bookmark"
                    component={Bookmarks}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => (
                            <TabButton {...props} item={{
                                route: 'Bookmark',
                                label: 'Bookmarks',
                                icon: 'bookmarks-outline',
                            }} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(60),
    },
    tabBar: {
    
      borderTopLeftRadius:moderateScale(16),
      borderTopRightRadius:moderateScale(16),
    borderRadius:moderateScale(10),
        height: moderateVerticalScale(60),
        backgroundColor: COLORS.secondary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Android shadow
    elevation: 10,

    },
    btn: {
        width: moderateScale(40),
        height: moderateVerticalScale(40,0.3),
        borderRadius: moderateScale(25),
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:COLORS.primary ,
        borderRadius: moderateScale(30),
    },
})