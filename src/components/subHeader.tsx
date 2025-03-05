import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { icons } from '../constants/Icon';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import mainStyles from '../assets/styles/mainStyles';

const SubHeader = ({ title, onPress, style }) => {
  return (
    <View style={[styles.container,mainStyles.secondaryBackgroundColor,mainStyles.widthFull,mainStyles.dropShadowEffect, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={icons.backIcon}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={[mainStyles.darkTextColor,mainStyles.fontSize18,mainStyles.fontInriaSansRegular,{textAlign:'center'}]}>
        {title}
      </Text>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateVerticalScale(60,0.6),
    gap: moderateScale(100),
    paddingHorizontal: scale(13),
    paddingTop: verticalScale(12),

   
  },
  icon: {
    width: scale(24),
    height: verticalScale(24),
  },
 
});
