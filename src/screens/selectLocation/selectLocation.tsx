import { View, TextInput, ActivityIndicator, TouchableOpacity, Alert, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SubHeader from '../../components/subHeader';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../constants/color';
import { FONTS } from '../../constants/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SecondaryButton from '../../components/secondaryButton';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import { requestLocationPermission } from '../../utils/permissionUtil';
import { AppStackScreenProps } from '../../navigation/navigationTypes';
import MainHeader from '../../components/mainHeader';
import { GOOGLE_API_KEY } from '@env';
const SelectLocation:React.FC<AppStackScreenProps<"SelectLocation">> = ({ navigation }) => {
  const [location, setLocation] = useState([]);
  const inputRef = useRef(null);

  const handleSelectLocation = (data, details) => {
  
  console.log('details lat long',details.geometry.location.lat)
    const addressComponents = details?.address_components;
  
    if (!addressComponents) return;
  
    // Extract city
    const city = addressComponents.find(component =>
      component.types.includes('locality')
    )?.long_name || 
    addressComponents.find(component => 
      component.types.includes('administrative_area_level_1')
    )?.long_name;  // Fallback to state if city is missing
  
    // Extract country
    const country = addressComponents.find(component =>
      component.types.includes('country')
    )?.long_name;
  
    if (city && country) {
      const locationArray = [city, country]; // Store in array
      setLocation(locationArray);
      
      // Pass array as navigation params
      navigation.getParent()?.setParams({ location: locationArray ,lat:details?.geometry?.location.lat,long:details?.geometry?.location.lng});
      navigation.navigate('BottomNav', { screen: 'Home', location: locationArray ,lat:details?.geometry?.location.lat,long:details?.geometry?.location.lng});
    }
  };
  async function fetchCurrentLocation() {
   
    
    const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
        Alert.alert('Permission Denied', 'Location access is required!');
        return;
      }
    try {
      const locationData = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
      });
  
      const { latitude, longitude } = locationData;
      Geocoder.init(GOOGLE_API_KEY);
  
      const geoData = await Geocoder.from(latitude, longitude);
      if (geoData.results.length > 0) {
        const addressComponents = geoData.results[0].address_components;
        const area = addressComponents.find(component => component.types.includes('sublocality'))?.long_name;
        const city = addressComponents.find(component => component.types.includes('locality'))?.long_name;
  
        setLocation([area, city]); // Set area and city
        navigation.getParent()?.setParams({ location: location });
      navigation.navigate('BottomNav', { screen: 'Home', location: location,lat:latitude,long:longitude });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      
    }
  }
  

  return (
    <View style={mainStyles.container}>
      <MainHeader title={'Select City'} headerType='sub' onPressBack={()=>navigation.goBack()}/>

    
      </View>
  );
};

export default SelectLocation;
