import { View, Text, ImageBackground, StatusBar, Image } from 'react-native'
import React from 'react'
import onBoardingStyles from '../../assets/styles/onBoardingStyles'
import { images } from '../../constants/image'

const otp = () => {
  return (
    <View style={onBoardingStyles.topSection}>
            <ImageBackground 
              source={images.mapBackground} 
              style={onBoardingStyles.imageBackground} 
              resizeMode="cover"
            >
              <StatusBar hidden={false} barStyle='dark-content' backgroundColor={'transparent'} translucent={true} />
              <View style={onBoardingStyles.overlay} />
              <Image 
                source={images.onBoardingImage} 
                style={onBoardingStyles.foregroundImage} 
                resizeMode="contain" 
              />
            </ImageBackground>
          </View>
  )
}

export default otp