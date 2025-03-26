// navigationTypes.ts

import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps as RNBottomTabScreenProps } from "@react-navigation/bottom-tabs";
  
  export type AuthStackParamList={
    Login:undefined;
    OTP:undefined;
    OnboardingScreen:undefined;
    TermsAndConditions:undefined;
    PrivacyPolicy:undefined;
    ProfileName:undefined;
  }


  export type AppStackParamList={
    BottomNav:undefined;
    SelectLocation:undefined;
    ProfileScreen:undefined;
    EditProfile:undefined;
    Settings:undefined;
    DeleteAccount:undefined;
    NotificationScreen:undefined;
    BoxDetail:undefined;
    BookingDetail:undefined;
    SlotBooking:undefined;
    BookingConfirmation:undefined;
    ClientReview:undefined;
    AddRatingAndReview:undefined
  }

  export type BottomTabParamList = {
    Home: undefined;
    Booking: undefined;
    Bookmark: undefined;
  };

  // Props for Screens with Navigation & Route
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;
export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;
export type BottomTabScreenProps<T extends keyof BottomTabParamList> = RNBottomTabScreenProps<BottomTabParamList, T>;

// Route Props (If you only need route, without navigation)
export type AuthStackRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type AppStackRouteProp<T extends keyof AppStackParamList> = RouteProp<AppStackParamList, T>;
export type BottomTabRouteProp<T extends keyof BottomTabParamList> = RouteProp<BottomTabParamList, T>;