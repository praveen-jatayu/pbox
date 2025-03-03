import {View, Text, ImageBackground, StatusBar, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Animated, Easing} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import {images} from '../../constants/image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {COLORS} from '../../constants/color';
import Label from '../../components/label';
import CustomCheckBox from '../../components/checkbox';
import PrimaryButton from '../../components/primaryButton';
import { icons } from '../../constants/Icon';
import loginStyles from '../../assets/styles/loginStyles';
import mainStyles from '../../assets/styles/mainStyles';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({navigation}) => {
  const [isTandCChecked, setIsTandCChecked] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(false);
    // Animated values for opacity & translateY
    const translateY = useRef(new Animated.Value(0)).current;
    // const opacity = useRef(new Animated.Value(1)).current;
  
    const handleSendOtp = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 50, // Move button down
          duration: 500,
          useNativeDriver: true,
        }),
        // Animated.timing(opacity, {
        //   toValue: 0.1, // Fade out
        //   duration: 500,
        //   useNativeDriver: true,
        // }),
      ]).start(() => {
        navigation.navigate('OTP',{mobileNo:mobileNo,actualOtp:'1111'});
        
      });
    };
  
 
    useFocusEffect(
      useCallback(() => {
        translateY.setValue(0);
      }, [])
    );
 

  const formatPhoneNumber = (text) => {
    // Remove all non-numeric characters
    let cleaned = text.replace(/\D/g, '');

    // Limit to 10 digits
    cleaned = cleaned.slice(0, 10);

    // Format as "000 0000 000"
    let formatted = cleaned.replace(/(\d{3})(\d{4})?(\d{0,3})?/, (match, p1, p2, p3) => {
      return [p1, p2, p3].filter(Boolean).join(' ');
    });

    setMobileNo(formatted);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[mainStyles.container]}>
      <View style={onBoardingStyles.topSection}>
        <ImageBackground
          source={images.mapBackground}
          style={onBoardingStyles.imageBackground}
          resizeMode="cover">
          <StatusBar
            hidden={false}
            barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent={true}
          />
          <View style={onBoardingStyles.overlay} />

          <Image
            source={images.onBoardingImage}
            style={[
              onBoardingStyles.foregroundImage,
              {borderRadius: moderateScale(50), marginTop: verticalScale(100)},
            ]}
            resizeMode="contain"
          />
          {/* Cross button */}
          <TouchableOpacity
              style={loginStyles.crossButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}>
              <Image
                source={icons.cross}
                resizeMode="contain"
                style={loginStyles.crossIcon}
              />
            </TouchableOpacity>

            {/* Bottom Section */}
            <View style={loginStyles.bottomSection}>
              <Text style={loginStyles.heading}>You're So Close!</Text>
              <Label text="Enter Phone Number" required={true} />

              {/* Phone number input field */}
              <View style={loginStyles.inputContainer}>
                <View style={loginStyles.countryCodeContainer}>
                  <Text style={loginStyles.countryCode}>+91</Text>
                  <Image
                    source={images.indiaFlag}
                    resizeMode="contain"
                    style={loginStyles.flagIcon}
                  />
                </View>
                <TextInput
                  style={loginStyles.input}
                  value={mobileNo}
                  onChangeText={formatPhoneNumber}
                  placeholder="0123-456-789"
                  placeholderTextColor={COLORS.lightText}
                  keyboardType="number-pad"
                  maxLength={12}
                  cursorColor={COLORS.primary}
                  autoFocus={true}
                  inputMode='tel'
                />
              </View>

              {/* Terms & Conditions Checkbox */}
              <View style={loginStyles.checkboxContainer}>
              <CustomCheckBox
                  value={isTandCChecked}
                  onValueChange={setIsTandCChecked} style={undefined}            />
                <View>
                  <Text style={loginStyles.termsText}>
                    I agree to the{' '}
                    <Text
                      style={loginStyles.linkText}
                      onPress={() => navigation.navigate('TermsAndConditions')}>
                      Terms and Conditions
                    </Text>{' '}
                    &{' '}
                    <Text
                      style={loginStyles.linkText}
                      onPress={() => navigation.navigate('PrivacyPolicy')}>
                      Privacy Policy
                    </Text>
                  </Text>
                </View>
              </View>

              {/* Send OTP Button */}
              <Animated.View style={[loginStyles.buttonContainer, { transform: [{ translateY }] }]}>
                <PrimaryButton title={'SEND OTP'} onPress={handleSendOtp} disabled={!isMobileValid && !isTandCChecked} style={undefined} />
              </Animated.View>
            </View>
        </ImageBackground>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
