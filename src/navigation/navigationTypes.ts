// navigationTypes.ts

export type RootStackParamList = {
    BottomNav: undefined;
    SelectCity: undefined;
    ProfileScreen: undefined;
    EditProfile: undefined;
    Settings: undefined;
    NotificationScreen: undefined;
    CourtDetail: { 
      // Example: if you expect a court object parameter. Otherwise use undefined.
      courtData: any;
    };
    ClientReview: undefined;
  };
  