declare module "react-native-android-location-services-dialog-box" {
    export interface LocationServicesDialogBoxOptions {
      message: string;
      ok: string;
      cancel: string;
      enableHighAccuracy?: boolean;
      showDialog?: boolean;
      openLocationServices?: boolean;
      preventDismiss?: boolean;
      preventOutSideTouch?:boolean
      providerListener?:boolean
    }
  
    const LocationServicesDialogBox: {
      checkLocationServices: (options: LocationServicesDialogBoxOptions) => Promise<any>;
      forceCloseDialog: () => void;
    };
  
    export default LocationServicesDialogBox;
  }
  