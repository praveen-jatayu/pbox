import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useContext, useState} from 'react';
import TextInputComponent from '../../components/textInputComponent';
import PrimaryButton from '../../components/primaryButton';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import {apiPost, saveAuthToken} from '../../services/apiService/apiService';
import {API_ENDPOINTS} from '../../constants/apiEndPoinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../components/toastMessage';
import {useAuth} from '../../customHooks/useAuth';
import {AuthStackScreenProps} from '../../navigation/navigationTypes';
import ScreenWrapper from '../../components/screenWrapper';

const ProfileName: React.FC<AuthStackScreenProps<'ProfileName'>> = ({
  navigation,
  route,
}) => {
  // const {userDetail} = route.params;
  const {setUserInfo, setUserToken} = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateForm = () => {
    return firstName.trim().length > 0;
  };

  const handleNameChange = (text: string): void => {
    setFirstName(text);
    if (text.trim().length === 0) {
      setNameError('First name is required');
    } else {
      setNameError('');
    }
  };

  const handleNext = async () => {
    let formData = new FormData();
    // formData.append('user_id', userDetail.id);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);

    try {
      const response = await apiPost(
        API_ENDPOINTS.USER.UPDATE_USERNAME,
        formData,
      );
      if (response.success) {
        setUserInfo(response.data);
        setUserToken(response.data.api_token);
        await saveAuthToken(response.data.api_token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      } else {
        showToast(
          'error',
          response.message || 'Failed to update profile name!',
        );
      }
    } catch (error: unknown) {
      console.error('Failed to Register user:', error);
      if (error instanceof Error)
        showToast('error', error.message || 'Failed to update profile name!');
    }
  };

  return (
    <ScreenWrapper
      safeTop={true}
      safeBottom={true}
      scrollable={false}
      padding={false}
      withHeader={true}
      keyboardAvoiding={true}
      backgroundColor="#fff">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={mainStyles.container}>
          <View
            style={{
              paddingHorizontal: scale(16),
              marginTop: verticalScale(40),
            }}>
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
              onChangeText={text => setLastName(text)}
            />
          </View>

          {/* NEXT Button */}
          <View style={[onBoardingStyles.bottomSection]}>
            <PrimaryButton
              title={'NEXT'}
              onPress={handleNext}
              disabled={!validateForm()}
              style={undefined}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default ProfileName;
