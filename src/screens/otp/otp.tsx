import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import loginStyles from '../../assets/styles/loginStyles';

import { images } from '../../constants/image';
import { COLORS } from '../../constants/color';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Label from '../../components/label';
import PrimaryButton from '../../components/primaryButton';
import SecondaryButton from '../../components/secondaryButton';
import { icons } from '../../constants/Icon';
import otpStyles from '../../assets/styles/otpStyles';
import mainStyles from '../../assets/styles/mainStyles';

const OTP = ({ navigation, route }) => {
  const [resendTimer, setResendTimer] = useState(0);
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifiedPressed, setIsVerifiedPressed] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const intervalId = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [resendTimer]);

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setResendTimer(120);
    }
  };

  const formatResendTimer = () => {
    const minutes = Math.floor(resendTimer / 60);
    const seconds = resendTimer % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleVerify = () => {
    setIsVerifiedPressed(true);
    if (otp !== "11111") {
      setErrorMessage('* OTP does not match. Please try again!');
    } else {
      navigation.navigate('ProfileName')
      setErrorMessage('');
      console.log('OTP Verified Successfully'); // Replace with actual login function
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={mainStyles.container}>
      <View style={onBoardingStyles.topSection}>
        <ImageBackground source={images.mapBackground} style={onBoardingStyles.imageBackground} resizeMode="cover">
          <StatusBar hidden={false} barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
          <View style={onBoardingStyles.overlay} />

          <Image source={images.onBoardingImage} style={onBoardingStyles.foregroundImage} resizeMode="contain" />

          {/* Cross Button */}
          <TouchableOpacity style={loginStyles.crossButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Image source={icons.cross} resizeMode="contain" style={loginStyles.crossIcon} />
          </TouchableOpacity>

          {/* Bottom Section */}
          <View style={loginStyles.bottomSection}>
            <Text style={loginStyles.heading}>You're So Close!</Text>

            {/* Enter OTP Label */}
            <View style={otpStyles.otpLabelContainer}>
              <Label required={true} text={'Enter OTP'} />
              <Pressable onPress={() => Linking.openURL(`tel:${route.params.mobileNo}`)}>
                <Text style={otpStyles.phoneNumberText}>+91 {route.params.mobileNo}</Text>
              </Pressable>
            </View>

            {/* OTP Input */}
            <OTPInputView
              style={otpStyles.otpInputContainer}
              pinCount={5}
              autoFocusOnLoad={true}
              code={otp}
              onCodeChanged={(code) => {
                setOtp(code);
                setErrorMessage(''); // Remove error message when OTP starts typing
              }}
              codeInputFieldStyle={[
                otpStyles.otpField,
                isVerifiedPressed && errorMessage ? otpStyles.otpFieldError : null,
              ]}
              codeInputHighlightStyle={{ borderColor: COLORS.primary }}
            />

            {/* Error Message */}
            {isVerifiedPressed && errorMessage ? <Text style={otpStyles.errorText}>{errorMessage}</Text> : null}

            {/* Buttons */}
            <View style={loginStyles.buttonContainer}>
              <PrimaryButton title={'VERIFY'} onPress={handleVerify} disabled={otp.length !== 5} />
              <SecondaryButton
                title={resendTimer > 0 ? `Resend OTP in ${formatResendTimer()}` : 'RESEND OTP'}
                onPress={handleResendOtp}
                disabled={resendTimer > 0}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
};

export default OTP;
