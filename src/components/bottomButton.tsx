import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colorConstant';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FONTS } from '../constants/fontConstant';

const PrimaryButton = ({ title, disabled, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(12),
    width:'90%',
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center',
    elevation:7
  },
  disabledButton: {
    backgroundColor: COLORS.disabled, // Light gray for disabled state
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: scale(16),
    fontFamily:FONTS.inriaSansBold,
    lineHeight:verticalScale(17)
  },
});

export default PrimaryButton;
