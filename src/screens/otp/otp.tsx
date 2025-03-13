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
  TextInput,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import loginStyles from '../../assets/styles/loginStyles';
import { images } from '../../constants/image';
import Label from '../../components/label';
import PrimaryButton from '../../components/primaryButton';
import SecondaryButton from '../../components/secondaryButton';
import { icons } from '../../constants/Icon';
import otpStyles from '../../assets/styles/otpStyles';
import mainStyles from '../../assets/styles/mainStyles';
import { verticalScale } from 'react-native-size-matters';
import { AuthContext } from '../../context/authContext';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/color';

const OTP = ({ route }) => {
  const {mobileNo,actualOtp}=route.params
  // console.log('check',mobileNo,actualOtp)
  const navigation = useNavigation();
  const [resendTimer, setResendTimer] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '']);
 const {login}=useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifiedPressed, setIsVerifiedPressed] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading,setLoading]=useState(false)
const translateY = useRef(new Animated.Value(80)).current;
    const opacity = useRef(new Animated.Value(0.7)).current;

    useEffect(()=>{
      Animated.parallel([
              Animated.timing(translateY, {
                toValue: 0, // Move button down
                duration: 500,
                useNativeDriver: true,
              }),
              Animated.timing(opacity, {
                toValue: 1, // Fade out
                duration: 500,
                useNativeDriver: true,
              }),
            ]).start()
    },[])
  useEffect(() => {
    if (resendTimer > 0) {
      const intervalId = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [resendTimer]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setResendTimer(120);
    }
  };
  const handleOtpChange = (value, index) => {
    setErrorMessage('')
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].current.focus();
    }

  };
  const handleVerify = () => {
    setIsVerifiedPressed(true);
    const enteredOtp = otp.join('');
    checkOtp(enteredOtp); // Now login will only be called when VERIFY button is pressed
  };
  const checkOtp = async(enteredOtp:string) => { 
    setLoading(true)
    if (enteredOtp === actualOtp) {
     await login(mobileNo, registerNewUser);
     
    } else {
      setErrorMessage('* OTP does not match. Please try again!');
    }
    setLoading(false)
  };
 
  const formatResendTimer = () => {
    const minutes = Math.floor(resendTimer / 60).toString().padStart(2,"0")
    const seconds = String(resendTimer % 60).padStart(2,"0");
    return `${minutes}:${seconds}`
  };

 
// navigate to register profile name screen when the new user login for the first time
  const registerNewUser=async(userInfo)=>{
    console.log('check',navigation)
      navigation.navigate('ProfileName',{userDetail:userInfo});
    
  }
  const renderOtpInputs = () => {
    return otp.map((digit, index) => (
      <TextInput
        key={index}
        value={digit}
        onChangeText={value => handleOtpChange(value, index)}
        maxLength={1}
        keyboardType="number-pad"
        style={otpStyles.otpField}
  
        ref={inputRefs[index]}
        autoFocus={index === 0}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            // If backspace is pressed and the current input is empty, focus the previous input
            if (digit === '') {
              if (index > 0) {
                inputRefs[index - 1].current.focus();
              }
            }
          }
        }}
      />
    ));
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

            <View style={otpStyles.otpInputContainer}>{renderOtpInputs()}</View>
            {/* Error Message */}
            {isVerifiedPressed && errorMessage ? <Text style={otpStyles.errorText}>{errorMessage}</Text> : null}

            {/* Buttons */}
            {loading && <ActivityIndicator color={COLORS.primary} size={'large'} style={{marginTop:verticalScale(12)}}/>}
        <Animated.View style={{ transform: [{ translateY }], opacity }}>
              <PrimaryButton title={'VERIFY'} onPress={handleVerify} disabled={otp.length !== 4} style={{marginTop:verticalScale(12)}} />
              </Animated.View>
              <SecondaryButton
                title={resendTimer > 0 ? `Resend OTP in ${formatResendTimer()}` : 'RESEND OTP'}
                onPress={handleResendOtp}
                disabled={resendTimer > 0}
              />
         
          </View>
        </ImageBackground>
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
};

export default OTP;
