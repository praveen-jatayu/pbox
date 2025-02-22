import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colorConstant';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FONTS } from '../constants/font';

const PrimaryButton = ({ title, disabled, onPress,style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        disabled ? styles.disabledButton : styles.enabledButton,style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(13),
    width: '95%',
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  enabledButton: {
    backgroundColor: COLORS.primary,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  disabledButton: {
    backgroundColor: COLORS.disabled, // Light gray for disabled state
    elevation: 0, // Removes shadow
    shadowColor: 'transparent', // Ensures no shadow effect
  },
  buttonText: {
    fontSize: scale(16),
    fontFamily: FONTS.inriaSansBold,
    lineHeight: verticalScale(17),
    color: COLORS.secondary,
  },
  disabledText: {
    color: COLORS.lightText, // Lighter text when disabled
  },
  
});

export default PrimaryButton;
