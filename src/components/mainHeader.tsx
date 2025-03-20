import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale, scale, verticalScale} from 'react-native-size-matters';
import { icons } from '../constants/Icon';
import mainStyles from '../assets/styles/mainStyles';



const MainHeader = ({headerType = 'home',location}) => {
  const navigation = useNavigation();

  // Render header left component based on headerType prop
  const renderLeftContent = () => {
    if (headerType === 'home') {
      return (
        <TouchableOpacity 
          onPress={() => navigation.navigate('SelectLocation')}
          style={styles.locationContainer}
          activeOpacity={0.8}>
          <Image
            source={icons.locationIcon}
            style={styles.locationIcon}
          />
          <View style={styles.locationTextContainer}>
            <Text style={[mainStyles.fontInriaSansRegular,mainStyles.darkTextColor,mainStyles.fontSize18]}>Sector 75</Text>
            <Image
              source={icons.downArrowIcon}
              style={styles.downArrowIcon}
            />
          </View>
        </TouchableOpacity>
      );
    } else if (headerType === 'booking') {
      return (
        <View style={styles.locationContainer}>
          <Text style={[mainStyles.darkTextColor,mainStyles.fontInriaSansRegular,mainStyles.fontSize18]}>Bookings</Text>
          </View>
      
      );
    } else if (headerType === 'bookmark') {
      return (
        <View style={styles.locationContainer}>
        <Text style={[mainStyles.darkTextColor,mainStyles.fontInriaSansRegular,mainStyles.fontSize18]}>Bookmarks</Text>
        </View>
      );
    } else {
      // Default or additional header types can be handled here.
      return null;
    }
  };

  return (
    <View style={[styles.headerContainer, mainStyles.secondaryBackgroundColor, mainStyles.widthFull, mainStyles.dropShadowEffect]}>
      {renderLeftContent()}
      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} activeOpacity={0.5}>
          <Image 
            source={icons.notificationIcon}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} activeOpacity={0.5}>
          <Image 
            source={icons.userIcon}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateVerticalScale(65, 0.8),
    justifyContent: 'space-between',
    paddingHorizontal: scale(13),
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(15),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: scale(20),
    height: verticalScale(20),
  },
  locationTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(10),
  },
 
  downArrowIcon: {
    width: scale(17),
    height: verticalScale(17),
    marginLeft: scale(5),
  },
  iconGroup: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: moderateScale(23),
    height: moderateVerticalScale(23),
    marginLeft: scale(10),
  },
  
});
