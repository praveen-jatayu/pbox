import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import {icons} from '../../constants/Icon';
import profileStyles from '../../assets/styles/profileStyles';
import {useAuth} from '../../customHooks/useAuth';
import {AppStackScreenProps} from '../../navigation/navigationTypes';
import ScreenWrapper from '../../components/screenWrapper';

const ProfileScreen: React.FC<AppStackScreenProps<'ProfileScreen'>> = ({
  navigation,
  route,
}) => {
  const {logout, userInfo} = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of going back
      e.preventDefault();

      // Navigate explicitly to 'My Lorry'
      navigation.navigate('BottomNav');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenWrapper
      safeTop={true}
      safeBottom={true}
      scrollable={false}
      padding={false}
      withHeader={true}>
      {/* Profile pic and name container */}
      <View
        style={[
          profileStyles.profileContainer,
          mainStyles.secondaryBorderColor,
          mainStyles.secondaryBackgroundColor,
          mainStyles.flexContainer,
        ]}>
        <View style={[profileStyles.profileInfoContainer]}>
          {/* Profile pic container */}
          <View
            style={[
              profileStyles.profilePicContainer,
              mainStyles.contentCenter,
              mainStyles.iconBackgroundColor,
            ]}>
            {userInfo?.profile_pic ? (
              <Image
                source={{uri: userInfo.profile_pic}}
                style={[profileStyles.profilePicContainer]}
              />
            ) : (
              <Image
                source={icons.userIcon}
                style={profileStyles.userIconStyle}
              />
            )}
          </View>
          {/* Name & phone container */}
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansRegular,
                mainStyles.darkTextColor,
                mainStyles.fontSize20,
              ]}>
              {userInfo?.name}
            </Text>
            <Text
              style={[
                profileStyles.profilePhone,
                mainStyles.fontInriaSansRegular,
                mainStyles.darkTextColor,
                mainStyles.fontSize14,
              ]}>
              +91 {userInfo?.mobile_no}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('EditProfile')}>
          <Image source={icons.editIcon} style={profileStyles.editIconStyle} />
        </Pressable>
      </View>

      {/* Profile menu container */}
      <View
        style={[
          profileStyles.menuContainer,
          mainStyles.secondaryBorderColor,
          mainStyles.secondaryBackgroundColor,
        ]}>
        {/* Settings option */}
        <Pressable
          style={profileStyles.menuItem}
          onPress={() => navigation.navigate('Settings')}>
          <View
            style={[
              profileStyles.menuIconContainer,
              mainStyles.contentCenter,
              mainStyles.iconBackgroundColor,
            ]}>
            <Image
              source={icons.settingsIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansLight,
                mainStyles.darkTextColor,
                mainStyles.fontSize18,
              ]}>
              Settings
            </Text>
          </View>
        </Pressable>
        {/* Privacy policy option */}
        <Pressable style={profileStyles.menuItem}>
          <View
            style={[
              profileStyles.menuIconContainer,
              mainStyles.contentCenter,
              mainStyles.iconBackgroundColor,
            ]}>
            <Image
              source={icons.privacyPolicyIcon}
              style={profileStyles.menuIconStyleAlt}
            />
          </View>
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansLight,
                mainStyles.darkTextColor,
                mainStyles.fontSize18,
              ]}>
              Privacy Policy
            </Text>
          </View>
        </Pressable>
        {/* Help & Support option */}
        <Pressable style={profileStyles.menuItem}>
          <View
            style={[
              profileStyles.menuIconContainer,
              mainStyles.contentCenter,
              mainStyles.iconBackgroundColor,
            ]}>
            <Image
              source={icons.helpIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansLight,
                mainStyles.darkTextColor,
                mainStyles.fontSize18,
              ]}>
              Help & Support
            </Text>
          </View>
        </Pressable>
        {/* Delete Account option */}
        <Pressable
          style={profileStyles.menuItem}
          onPress={() => navigation.navigate('DeleteAccount')}>
          <View
            style={[
              profileStyles.menuIconContainer,
              mainStyles.contentCenter,
              mainStyles.iconBackgroundColor,
            ]}>
            <Image
              source={icons.userPrimaryIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansLight,
                mainStyles.darkTextColor,
                mainStyles.fontSize18,
              ]}>
              Delete Account
            </Text>
          </View>
        </Pressable>
        {/* Logout option */}
        <Pressable style={profileStyles.menuItem} onPress={logout}>
          <View
            style={[
              profileStyles.menuIconContainer,
              mainStyles.contentCenter,
              mainStyles.iconBackgroundColor,
            ]}>
            <Image
              source={icons.logoutIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansLight,
                mainStyles.darkTextColor,
                mainStyles.fontSize18,
              ]}>
              Logout
            </Text>
          </View>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
