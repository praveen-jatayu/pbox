import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import TextInputComponent from '../../components/textInputComponent';
import PrimaryButton from '../../components/primaryButton';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import { scale, verticalScale } from 'react-native-size-matters';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';

const ProfileName = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateForm = () => {
    return name.trim().length > 0;
  };

  const handleNameChange = (text) => {
    setName(text);
    if (text.trim().length === 0) {
      setNameError('First name is required');
    } else {
      setNameError('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={mainStyles.container}>
        <SubHeader title={'Fill Out Your Profile'} onPress={() => navigation.goBack()} style={undefined} />

        <View style={{ paddingHorizontal: scale(16), marginTop: verticalScale(60) }}>
          {/* First Name Input */}
          <TextInputComponent
            label={'Enter First Name'}
            placeholder={''}
            value={name}
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
            onPress={() => navigation.navigate('Home')} 
            disabled={!validateForm()} 
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileName;
