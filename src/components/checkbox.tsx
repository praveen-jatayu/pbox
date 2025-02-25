// CustomCheckBox.js
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import mainStyles from '../assets/styles/mainStyles';

const CustomCheckBox = ({
  value = false,
  onValueChange = () => {},
  disabled = false,
  style,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkBoxSquare,
          mainStyles.primaryBorderColor,
          value && mainStyles.successBackgroudColor,
          disabled && styles.disabledBox,
        ]}
      >
        {value && (
          <Icon
            type="material-community"
            name="check"
            color="#FFF"
            size={20}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxSquare: {
    width: scale(20),
    height: verticalScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBox: {
    opacity: 0.5,
  },
});
