import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { icons } from '../constants/Icon';
import { COLORS } from '../constants/color';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FONTS } from '../constants/font';

const CustomHeader = ({ title, onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={icons.backIcon}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    height: verticalScale(60),
    width: '100%',
    gap: moderateScale(100),
    paddingHorizontal: scale(13),
    paddingVertical: verticalScale(18),
    elevation: 10,
  },
  icon: {
    width: scale(24),
    height: verticalScale(24),
  },
  title: {
    color: COLORS.darkText,
    fontFamily: FONTS.inriaSansRegular,
    fontSize: scale(18),
    textAlign: 'center',
  },
});
