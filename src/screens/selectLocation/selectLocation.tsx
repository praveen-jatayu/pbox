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
      Geocoder.init('AIzaSyBuUVyHOxiZyUIvBIvsZg6O_ZiedhxW0FA');
  
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
      <SubHeader title={'Select City'} onPress={() => navigation.goBack()} style={undefined} />

      {/* Search Box */}
      <View
        style={{
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.lightBorder,
          borderWidth: 1,
          borderRadius: moderateScale(10),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(10),
          marginTop: verticalScale(20),
          marginHorizontal: scale(16),
        }}
      >
        {/* Google Places Input */}
        <GooglePlacesAutocomplete
          ref={inputRef}
          placeholder="Search for area, city..."
          minLength={2}
          onPress={handleSelectLocation}
          fetchDetails={true}
          enablePoweredByContainer={false}
          currentLocation={false} // Disable default current location
          listLoaderComponent={<ActivityIndicator size="large" color={COLORS.primary} />}
          query={{
            key: 'AIzaSyBuUVyHOxiZyUIvBIvsZg6O_ZiedhxW0FA',
            language: 'en',
            types: '(cities)',
            components: 'country:in',
          }}
          textInputProps={{
            value: location,
            onChangeText: text => setLocation(text),
            placeholderTextColor: '#919191',
          }}
          listViewDisplayed="auto"
          styles={{
            textInput: {
              flex: 1,
              color: COLORS.darkText,
              fontSize: scale(15),
              fontFamily: FONTS.nunitoMedium,
              paddingVertical: verticalScale(8),
              marginLeft: scale(10),
            },
            listView: {
              width: scale(300),
              position: 'absolute',
              top: verticalScale(40),
              marginTop: verticalScale(20),
              marginLeft: scale(20),
              alignSelf: 'center',
            },
            row: {
              padding: verticalScale(10),
              borderBottomWidth: 0.6,
              borderBottomColor: COLORS.lightBorder,
            },
            description: {
              color: COLORS.darkText,
              fontSize: moderateScale(18),
              fontFamily: FONTS.inriaSansRegular,
            },
            separator: {
              height: 1,
              backgroundColor: '#E1E1E1',
            },
            poweredContainer: {
              alignSelf: 'center',
              opacity: 0.7,
            },
          }}
          keyboardShouldPersistTaps="always"
          debounce={300}
          renderLeftButton={() => (
            <View style={{ paddingTop: verticalScale(12), marginRight: scale(-5) }}>
              <AntDesign name={'search1'} size={21} color={COLORS.borderColor} />
            </View>
          )}
        />

        {/* Clear Button */}
        {location.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setLocation('');
              inputRef.current?.setAddressText('');
            }}
            style={{ marginLeft: scale(8) }}
          >
            <AntDesign name="closecircle" size={18} color={COLORS.borderColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Use Current Location Button */}
      {location.length==0 && (
      <SecondaryButton title={'Use Current Location'} disabled={undefined} onPress={fetchCurrentLocation} style={undefined} />
    )}
      </View>
  );
};

export default SelectLocation;
