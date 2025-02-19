import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import BottomNav from './bottomNav';
import SelectCity from '../screens/selectCity/selectCity';




const Stack = createNativeStackNavigator();

const AppStack = () => {


  return (
  <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        </Stack.Navigator>
      </>
  );
};

export default AppStack;
