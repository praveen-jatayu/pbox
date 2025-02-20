import React from 'react';
import {View, TextInput} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {COLORS} from '../constants/colorConstant';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import { FONTS } from '../constants/fontConstant';

const SearchInput = ({value, onChangeText, placeholder = 'Search'}) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeText}
      value={value}

      style={{
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.lightBorder,
        borderWidth: 1,
        borderRadius: moderateScale(10),
        height:verticalScale(49),
        width:'100%'
       
      }}
      inputStyle={{color: COLORS.darkText,fontSize:moderateScale(15),fontFamily:FONTS.nunitoMedium}}
      placeholderTextColor={COLORS.lightText}
      iconColor={COLORS.borderColor}
    />
  );
};
export default SearchInput;
