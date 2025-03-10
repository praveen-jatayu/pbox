import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useContext, useState } from 'react';
import TextInputComponent from '../../components/textInputComponent';
import PrimaryButton from '../../components/primaryButton';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import { apiPost, saveAuthToken } from '../../services/apiService/apiService';
import { API_ENDPOINTS } from '../../constants/apiEndPoinst';
import { AuthContext } from '../../context/authContext';


const ProfileName = ({ navigation ,route}) => {
 const {userDetail}=route.params
 console.log(userDetail)
 const {setUserInfo,setUserToken}=useContext(AuthContext)
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateForm = () => {
    return firstName.trim().length > 0;
  };

  const handleNameChange = (text) => {
    setFirstName(text);
    if (text.trim().length === 0) {
      setNameError('First name is required');
    } else {
      setNameError('');
    }
  };

  const handleNext=async()=>{
   
       let formData = new FormData();
       formData.append('first_name', firstName);
       formData.append('last_name', lastName);
       formData.append('mobile_no', userDetail.mobile_no);
      
   
       try {
         const response = await apiPost(API_ENDPOINTS.USER.UPDATE_PROFILE, formData);
         console.log('gog',response)
         return false;
         if (response.success) {
         await setUserInfo(userDetail)
         await setUserToken(userDetail.api_token)
         await saveAuthToken(userDetail.api_token)
         
           
         } else {
          console.log('error')
         }
       } catch (error) {
         console.error('Failed to Register user:', error);
       }
     };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={mainStyles.container}>
        <SubHeader title={'Fill Out Your Profile'} onPress={() => navigation.goBack()} style={{gap:scale(60),height:verticalScale(75),paddingTop:verticalScale(20)}} />

        <View style={{ paddingHorizontal: scale(16), marginTop: verticalScale(40) }}>
          {/* First Name Input */}
          <TextInputComponent
            label={'Enter First Name'}
            placeholder={''}
            value={firstName}
            onChangeText={handleNameChange}
            error={!!nameError}
            errorLabel={nameError}
            required={true}
          />

          {/* Last Name Input */}
          <TextInputComponent
            label={'Enter Last Name'}
            placeholder={''}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        {/* NEXT Button */}
        <View style={[onBoardingStyles.bottomSection]}>
          <PrimaryButton 
            title={'NEXT'} 
            onPress={handleNext} 
            disabled={!validateForm()} 

          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileName;
