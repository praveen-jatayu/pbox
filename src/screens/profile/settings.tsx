import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigationTypes';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/color';
import ToggleSwitch from 'toggle-switch-react-native';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
};

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <View style={[mainStyles.container]}>
      <SubHeader
        title={'Settings'}
        onPress={() => navigation.goBack()}
        style={undefined}
      />
      <View
        style={[
          mainStyles.secondaryBorderColor,
          styles.settingsContainer,
          mainStyles.secondaryBackgroundColor,
        ]}
      >
        <View style={[mainStyles.flexContainer, styles.optionContainer]}>
          <Text
            style={[
              mainStyles.fontInriaSansLight,
              mainStyles.darkTextColor,
              mainStyles.fontSize18,
            ]}
          >
            Push Notifications
          </Text>
          <ToggleSwitch
            isOn={pushEnabled}
            onColor={COLORS.primary}
            offColor={COLORS.borderColor}
            onToggle={isOn => setPushEnabled(isOn)}
          />
        </View>
        <View style={[mainStyles.flexContainer, styles.optionContainer, { borderBottomWidth: 0 }]}>
          <Text
            style={[
              mainStyles.fontInriaSansLight,
              mainStyles.darkTextColor,
              mainStyles.fontSize18,
            ]}
          >
            SMS Notifications
          </Text>
          <ToggleSwitch
            isOn={smsEnabled}
            onColor={COLORS.primary}
            offColor={COLORS.borderColor}
            onToggle={isOn => setSmsEnabled(isOn)}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: verticalScale(40),
    width: '90%',
    borderWidth: 1,
    marginHorizontal: scale(20),
    alignSelf: 'center',
    borderRadius: moderateScale(7),
  },
  optionContainer: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(5),
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.lightBorder,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
