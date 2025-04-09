import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

import PrimaryButton from '../../components/primaryButton';
import onBoardingStyles from '../../assets/styles/onBoardingStyles';
import {images} from '../../constants/image';
import mainStyles from '../../assets/styles/mainStyles';
import {verticalScale} from 'react-native-size-matters';
import {AuthStackScreenProps} from '../../navigation/navigationTypes';
import ScreenWrapper from '../../components/screenWrapper';

const OnboardingScreen: React.FC<AuthStackScreenProps<'OnboardingScreen'>> = ({
  navigation,
}) => {
  const textAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(textAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        // delay: 200,
      }),
    ]).start();
  }, []);

  return (
    <ScreenWrapper
    safe={false}
    scrollable={false}
    padding={false}
    backgroundColor="#fff"
    statusBarStyle="light-content"
    >
      <View style={mainStyles.container}>
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
              style={onBoardingStyles.foregroundImage}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>

        <Animated.View
          style={[
            onBoardingStyles.middleSection,
            {transform: [{translateY: textAnim}]},
          ]}>
          <Text
            style={[
              mainStyles.fontInriaSansBold,
              mainStyles.darkTextColor,
              mainStyles.fontSize24,
            ]}>
            Find Box In
          </Text>
          <Text
            style={[
              mainStyles.fontInriaSansBold,
              mainStyles.darkTextColor,
              mainStyles.fontSize24,
            ]}>
            Your Neighbourhood
          </Text>
          <Text
            style={[
              mainStyles.fontNunitoSemibold,
              mainStyles.lightTextColor,
              mainStyles.fontSize16,
              {marginTop: verticalScale(12), textAlign: 'center'},
            ]}>
            Just Like You Did as a Kid!
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            onBoardingStyles.bottomSection,
            {transform: [{translateY: buttonAnim}]},
          ]}>
          <Text
            style={[
              mainStyles.fontInriaSansRegular,
              mainStyles.darkTextColor,
              mainStyles.fontSize16,
              {marginBottom: verticalScale(10)},
            ]}>
            Let's Get Playing!
          </Text>
          <PrimaryButton
            title={'GO'}
            onPress={() => navigation.navigate('Login')}
            disabled={undefined}
            style={undefined}
          />
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default OnboardingScreen;
