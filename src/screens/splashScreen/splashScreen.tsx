import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/color';
import {images} from '../../constants/image';
import {FONTS} from '../../constants/font';
import {scale} from 'react-native-size-matters';
import ScreenWrapper from '../../components/screenWrapper';

const SplashScreen = () => {
  return (
    <ScreenWrapper
      backgroundColor={COLORS.primary}
      statusBarStyle="light-content"
      statusBarBackgroundColor="transparent"
      statusBarTranslucent={true}
      safeTop={false}
      safeBottom={true}>
      <ImageBackground
        source={images.splashBackground}
        style={styles.backgroundImage}>
        <Text style={styles.logoText}>LOGO</Text>
      </ImageBackground>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.secondary,
    fontFamily: FONTS.inriaSansBold,
    fontSize: scale(60),
  },
});

export default SplashScreen;
