// DeleteAccount.js
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {images} from '../../constants/image';
import {icons} from '../../constants/Icon';
import profileStyles from '../../assets/styles/profileStyles';
import TextInputComponent from '../../components/textInputComponent';
import PrimaryButton from '../../components/primaryButton';
import CustomCheckBox from '../../components/checkbox';
import BottomModal from '../../components/bottomModal';
import {AppStackScreenProps} from '../../navigation/navigationTypes';
import ScreenWrapper from '../../components/screenWrapper';

const DeleteAccount: React.FC<AppStackScreenProps<'DeleteAccount'>> = ({
  navigation,
}) => {
  const [reasonForDeleteAccount, setReasonForDeleteAccount] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [
    isDeleteAccountConfirmationModalVisible,
    setIsDeleteAccountConfirmationModalVisible,
  ] = useState(false);

  const toggleConfirmationModal = () => {
    setIsDeleteAccountConfirmationModalVisible(
      !isDeleteAccountConfirmationModalVisible,
    );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of going back
      e.preventDefault();

      // Navigate explicitly to 'My Lorry'
      navigation.navigate('ProfileScreen');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <ScreenWrapper
      safeTop={true}
      safeBottom={true}
      scrollable={false}
      padding={false}
      withHeader={true}>
      {/* top confirmation container */}
      <View
        style={{
          marginTop: verticalScale(20),
          marginHorizontal: scale(15),
          width: '90%',
        }}>
        <Text
          style={[
            mainStyles.fontInriaSansRegular,
            mainStyles.fontSize16,
            mainStyles.darkTextColor,
          ]}>
          Are You Sure You Want To Delete Your Account? You'll lose
        </Text>
      </View>
      {!keyboardVisible && (
        <View
          style={[
            mainStyles.flexContainer,
            {
              justifyContent: 'flex-start',
              marginHorizontal: scale(15),
              marginVertical: verticalScale(20),
              gap: scale(10),
            },
          ]}>
          <View
            style={[
              mainStyles.disabledBackgroundColor,
              {
                width: scale(150),
                borderRadius: moderateScale(10),
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(7),
                paddingHorizontal: scale(7),
                paddingVertical: verticalScale(10),
              },
            ]}>
            <Image
              source={icons.offerIcon}
              style={{width: scale(26), height: verticalScale(26)}}
            />
            <Text
              style={[
                mainStyles.fontNunitoMedium,
                mainStyles.fontSize14,
                mainStyles.darkTextColor,
              ]}>
              Ongoing Offers
            </Text>
          </View>
          <View
            style={[
              mainStyles.disabledBackgroundColor,
              {
                width: scale(150),
                borderRadius: moderateScale(10),
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(7),
                paddingHorizontal: scale(7),
                paddingVertical: verticalScale(10),
              },
            ]}>
            <Image
              source={images.football}
              style={{width: scale(24), height: verticalScale(24)}}
            />
            <Text
              style={[
                mainStyles.fontNunitoMedium,
                mainStyles.fontSize14,
                mainStyles.darkTextColor,
              ]}>
              Latest Match
            </Text>
          </View>
        </View>
      )}
      {/* Reason for deleting Account */}
      <View
        style={{
          marginVertical: verticalScale(8),
          marginHorizontal: scale(20),
        }}>
        <Text
          style={[
            mainStyles.fontInriaSansRegular,
            mainStyles.darkTextColor,
            mainStyles.fontSize16,
          ]}>
          Why Are You Closing The Account?
        </Text>

        {/* options container */}
        <View
          style={[
            profileStyles.menuContainer,
            mainStyles.secondaryBorderColor,
            mainStyles.secondaryBackgroundColor,
            mainStyles.widthFull,
            {marginVertical: verticalScale(10), gap: verticalScale(7)},
            keyboardVisible && {gap: verticalScale(0)},
          ]}>
          <View style={[profileStyles.menuItem, {gap: scale(12)}]}>
            <CustomCheckBox value={isChecked1} onValueChange={setIsChecked1} />
            <View>
              <Text
                style={[
                  mainStyles.fontInriaSansLight,
                  mainStyles.darkTextColor,
                  mainStyles.fontSize18,
                ]}>
                Booking was difficult
              </Text>
            </View>
          </View>

          <View style={[profileStyles.menuItem, {gap: scale(12)}]}>
            <CustomCheckBox value={isChecked2} onValueChange={setIsChecked2} />
            <View>
              <Text
                style={[
                  mainStyles.fontInriaSansLight,
                  mainStyles.darkTextColor,
                  mainStyles.fontSize18,
                ]}>
                UI was confusing
              </Text>
            </View>
          </View>

          <View style={[profileStyles.menuItem, {gap: scale(12)}]}>
            <CustomCheckBox value={isChecked3} onValueChange={setIsChecked3} />
            <View>
              <Text
                style={[
                  mainStyles.fontInriaSansLight,
                  mainStyles.darkTextColor,
                  mainStyles.fontSize18,
                ]}>
                Found a better alternative
              </Text>
            </View>
          </View>

          <View
            style={[
              profileStyles.menuItem,
              {gap: scale(12), marginBottom: verticalScale(-10)},
            ]}>
            <CustomCheckBox value={isChecked4} onValueChange={setIsChecked4} />
            <View>
              <Text
                style={[
                  mainStyles.fontInriaSansLight,
                  mainStyles.darkTextColor,
                  mainStyles.fontSize18,
                ]}>
                Other
              </Text>
            </View>
          </View>
        </View>

        {/* optional reason input */}
        {isChecked4 && (
          <View style={[mainStyles.marginTop10]}>
            <Text
              style={[
                mainStyles.fontNunitoSemibold,
                mainStyles.lightTextColor,
                mainStyles.fontSize16,
              ]}>
              Type Your Reason
            </Text>
            <TextInputComponent
              label=""
              placeholder="Optional"
              style={[
                keyboardVisible && {
                  height: verticalScale(60),
                  paddingVertical: verticalScale(-20),
                  fontSize: 16,
                },
              ]}
              value={reasonForDeleteAccount}
              multiline
              numberOfLines={2}
              onChangeText={text => setReasonForDeleteAccount(text)}
            />
          </View>
        )}
      </View>
      <PrimaryButton
        title={'DELETE MY ACCOUNT'}
        onPress={toggleConfirmationModal}
        style={{
          width: '90%',
          alignSelf: 'center',
          bottom: verticalScale(10),
          position: 'absolute',
        }}
        disabled={undefined}
      />

      <BottomModal
        isModalVisible={isDeleteAccountConfirmationModalVisible}
        toggleModal={toggleConfirmationModal}
        type={'deleteAccount'}
      />
    </ScreenWrapper>
  );
};

export default DeleteAccount;
