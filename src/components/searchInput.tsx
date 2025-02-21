import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants/colorConstant';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { FONTS } from '../constants/fontConstant';
const SearchInput = ({ value, onChangeText ,onPress}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Clear input text and re-focus the input
  const handleClear = () => {
    onChangeText(''); // Update parent state
    if (inputRef.current) {
      inputRef.current.clear();
      inputRef.current.focus();
    }
  };

  // Decide which icon to show: search or close
  const iconName = isFocused && value ? 'close' : 'search1';
  const handleIconPress = iconName === 'close' ? handleClear : null;
  return (
    <View style={styles.container}>
      <TextInput
       ref={inputRef}
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      placeholderTextColor={COLORS.lightText}
      />
     <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <AntDesign name={iconName} size={22} color={COLORS.borderColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
        borderColor: COLORS.lightBorder,
        borderWidth: 1,
        borderRadius: moderateScale(10),
        // height:verticalScale(49),
        paddingVertical:verticalScale(3),
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:scale(12)
  },
  input: {
    flex: 1,
    color: COLORS.darkText,fontSize:moderateScale(15),fontFamily:FONTS.nunitoMedium
  },
  iconContainer: {
    padding: 4,
  },
});
