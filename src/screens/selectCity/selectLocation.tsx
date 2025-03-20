import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import SubHeader from '../../components/subHeader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import uuid from 'react-native-uuid';
import {COLORS} from '../../constants/color';
import {FONTS} from '../../constants/font';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SelectLocation = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
  const uniqueId = uuid.v4();

  
  const handleSelectLocation = (data, details) => {
    console.log('ddddd',details)
    const addressComponents = details?.address_components;

    // Extract city name from address components
    const city = addressComponents?.find(component =>
      component.types.includes('locality')
    )?.long_name;

    if (city) {
      setLocation(city);  // Update state with city name
      navigation.getParent()?.setParams({ selectedCity: city }); // Pass city data to Bottom Tab's params
      navigation.goBack(); // Return to Home screen
    } else {
      alert('City not found. Please select a valid city.');
    }
  };
  

  return (
    <View style={mainStyles.container}>
      <SubHeader
        title={'Select City'}
        onPress={() => navigation.goBack()}
        style={undefined}
      />
      <View
        style={{
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.lightBorder,
          borderWidth: 1,
          borderRadius: moderateScale(10),
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'center',
          paddingHorizontal: scale(6),
          marginVertical:verticalScale(20),
          alignSelf:'center'
        }}>
    
        <GooglePlacesAutocomplete
    
          placeholder="Search..."
          minLength={2} // Minimum 2 characte
          onPress={handleSelectLocation}
          fetchDetails={true}
          enablePoweredByContainer={true}
          query={{
            key: 'AIzaSyBuUVyHOxiZyUIvBIvsZg6O_ZiedhxW0FA', // Replace with your API key
            language: 'en',
            types: '(cities)', 
            components: 'country:in',
          }}
          textInputProps={{
            value: location, // Bind the state to the input value
            onChangeText: text => setLocation(text), // Update the state as user types
            placeholderTextColor: '#919191',
          }}
          styles={{
            textInput: {
              flex: 1,
              color: COLORS.darkText,
              fontSize: scale(15),
              fontFamily: FONTS.nunitoMedium,
            },
            listView: {
              width: scale(300),
              position: 'absolute', // This makes the dropdown overlay
              top:verticalScale(40),
              backgroundColor: '#fff',
              marginTop: verticalScale(20),
              marginLeft:scale(20),
              alignSelf:'center',
            },
            row:{
              padding:verticalScale(10),
              borderBottomWidth:1,
              borderBottomColor:COLORS.borderColor  
            },
            description: {
              color: COLORS.darkText,
              fontSize: moderateScale(18),
              fontFamily: FONTS.inriaSansRegular,
            },
            separator:{
              height:1,
             backgroundColor: '#E1E1E1',   
            }
          }}
          keyboardShouldPersistTaps="always"
          debounce={300} // Delay requests for smoother UI
        />
        <View style={{  padding: 4,}}>
                <AntDesign name={'search1'} size={22} color={COLORS.borderColor} />
              </View>
      </View>
    </View>
  );
};

export default SelectLocation;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

