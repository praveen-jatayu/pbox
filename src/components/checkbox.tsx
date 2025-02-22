import React from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../constants/color';

const CustomCheckBox = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        tintColors={{ true: '#A3D9A5', false: COLORS.borderColor }} // Light green when checked
        boxType="square"
        onCheckColor="white" // White tick
        onFillColor="#A3D9A5" // Light green background
        onTintColor="#A3D9A5" // Light green outline
        style={styles.checkbox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center'
  },
  checkbox: {
    width: scale(23),
    height: verticalScale(23),
    marginBottom:verticalScale(11)
  },
});

export default CustomCheckBox;
