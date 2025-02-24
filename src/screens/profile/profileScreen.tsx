import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';

import { icons } from '../../constants/Icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigationTypes';
import profileStyles from '../../assets/styles/profileStyles';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <View style={[mainStyles.container]}>
      <SubHeader
        title={'Account'}
        onPress={() => navigation.goBack()} style={undefined}      />
      {/* Profile pic and name container */}
      <View style={[profileStyles.profileContainer, mainStyles.secondaryBorderColor, mainStyles.secondaryBackgroundColor,mainStyles.flexContainer]}>
        <View style={[profileStyles.profileInfoContainer]}>
          {/* Profile pic container */}
          <View style={[profileStyles.profilePicContainer, mainStyles.contentCenter,mainStyles.iconBackgroundColor]}>
            <Image
              source={icons.userIcon}
              style={profileStyles.userIconStyle}
            />
          </View>
          {/* Name & phone container */}
          <View>
            <Text style={[ mainStyles.fontInriaSansRegular, mainStyles.darkTextColor, mainStyles.fontSize20]}>
              John Doe
            </Text>
            <Text style={[profileStyles.profilePhone, mainStyles.fontInriaSansRegular, mainStyles.darkTextColor, mainStyles.fontSize14]}>
              +91 9374609900
            </Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('EditProfile')}>
          <Image
            source={icons.editIcon}
            style={profileStyles.editIconStyle}
          />
        </Pressable>
      </View>

      {/* Profile menu container */}
      <View style={[profileStyles.menuContainer, mainStyles.secondaryBorderColor, mainStyles.secondaryBackgroundColor]}>
        {/* Settings option */}
        <Pressable style={profileStyles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <View style={[profileStyles.menuIconContainer, mainStyles.contentCenter, mainStyles.iconBackgroundColor]}>
            <Image
              source={icons.settingsIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text style={[ mainStyles.fontInriaSansLight, mainStyles.darkTextColor, mainStyles.fontSize18]}>
              Settings
            </Text>
          </View>
        </Pressable>
        {/* Privacy policy option */}
        <Pressable style={profileStyles.menuItem}>
          <View style={[profileStyles.menuIconContainer, mainStyles.contentCenter, mainStyles.iconBackgroundColor]}>
            <Image
              source={icons.privacyPolicyIcon}
              style={profileStyles.menuIconStyleAlt}
            />
          </View>
          <View>
            <Text style={[ mainStyles.fontInriaSansLight, mainStyles.darkTextColor, mainStyles.fontSize18]}>
              Privacy Policy
            </Text>
          </View>
        </Pressable>
        {/* Help & Support option */}
        <Pressable style={profileStyles.menuItem}>
          <View style={[profileStyles.menuIconContainer, mainStyles.contentCenter, mainStyles.iconBackgroundColor]}>
            <Image
              source={icons.helpIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text style={[ mainStyles.fontInriaSansLight, mainStyles.darkTextColor, mainStyles.fontSize18]}>
              Help & Support
            </Text>
          </View>
        </Pressable>
        {/* Delete Account option */}
        <Pressable style={profileStyles.menuItem} onPress={()=>navigation.navigate('DeleteAccount')}>
          <View style={[profileStyles.menuIconContainer, mainStyles.contentCenter, mainStyles.iconBackgroundColor]}>
            <Image
              source={icons.userPrimaryIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text style={[ mainStyles.fontInriaSansLight, mainStyles.darkTextColor, mainStyles.fontSize18]}>
              Delete Account
            </Text>
          </View>
        </Pressable>
        {/* Logout option */}
        <Pressable style={profileStyles.menuItem}>
          <View style={[profileStyles.menuIconContainer, mainStyles.contentCenter, mainStyles.iconBackgroundColor]}>
            <Image
              source={icons.logoutIcon}
              style={profileStyles.menuIconStyle}
            />
          </View>
          <View>
            <Text style={[ mainStyles.fontInriaSansLight, mainStyles.darkTextColor, mainStyles.fontSize18]}>
              Logout
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;


