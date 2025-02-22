import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {moderateScale, moderateVerticalScale, scale, verticalScale} from 'react-native-size-matters';
import {COLORS} from '../../../constants/color';
import {icons} from '../../../constants/Icon';
import {FONTS} from '../../../constants/font';
import { useNavigation } from '@react-navigation/native';

const HomeCustomHeader = () => {
    const navigation=useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        height: moderateVerticalScale(65,0.8),
        width: '100%',
        justifyContent:'space-between',
        paddingHorizontal: scale(13),
        paddingTop: verticalScale(25),
        paddingBottom :verticalScale(15),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
      }}>
      <TouchableOpacity onPress={()=>navigation.navigate('SelectCity')} style={{flexDirection:'row',alignItems:'center',gap:scale(10)}}>
        <Image
          source={icons.locationIcon}
          style={{width: scale(18), height: verticalScale(20)}}
        />
        <View style={{flexDirection:'row',gap:scale(5),alignItems:'center'}}>
        <Text style={{fontFamily:FONTS.inriaSansRegular,fontSize:scale(16),color:COLORS.darkText}}>Sector 75</Text>
        <Image
          source={icons.downArrowIcon}
          style={{width: scale(17), height: verticalScale(17)}}
        />
        </View>
      </TouchableOpacity>
      <View style={{flexDirection:'row',gap:scale(10)}}>
        <TouchableOpacity onPress={()=>navigation.navigate('NotificationScreen')} activeOpacity={0.5}>
        <Image source={icons.notificationIcon}
        style={{width:moderateScale(23),height:moderateVerticalScale(23)}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen')} activeOpacity={0.5}>
        <Image source={icons.userIcon} style={{width:moderateScale(23),height:moderateVerticalScale(23)}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCustomHeader;
