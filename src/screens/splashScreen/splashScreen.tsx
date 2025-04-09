import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/color';
import {images} from '../../constants/image';
import {FONTS} from '../../constants/font';
import {scale} from 'react-native-size-matters';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.splashBackground}
        style={styles.backgroundImage}
        // resizeMode="cover"  // Cover the entire screen
      >
        <StatusBar
          hidden={false}
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <Text style={styles.logoText}>LOGO</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
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
