import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {icons} from '../constants/Icon';
import {COLORS} from '../constants/colorConstant';
import {scale, verticalScale} from 'react-native-size-matters';
import {FONTS} from '../constants/fontConstant';

const CustomHeader = ({title,onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        height: verticalScale(90),
        width: '100%',
        gap: scale(70),
        paddingHorizontal: scale(13),
        paddingTop: verticalScale(25),
        elevation: 10,
      }}>
        <TouchableOpacity onPress={onPress}>
      <Image
        source={icons.backIcon}
        style={{width: scale(24), height: verticalScale(24)}}
      />
      </TouchableOpacity>
      <Text
        style={{
          color: COLORS.darkText,
          fontFamily: FONTS.inriaSansRegular,
          fontSize: scale(18),
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
