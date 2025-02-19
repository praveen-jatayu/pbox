import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import PrimaryButton from './primaryButton';
import {verticalScale, scale, moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import SecondaryButton from './secondaryButton';
import {images} from '../constants/image';
import {COLORS} from '../constants/colorConstant';
import {FONTS} from '../constants/fontConstant';

const BottomModal = () => {
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(true);
  const toggleModal = () => {
    setIsBottomModalVisible(!isBottomModalVisible);
  };

  return (
    <Modal
      isVisible={isBottomModalVisible}
      onBackdropPress={toggleModal}
      backdropOpacity={0.4}
      statusBarTranslucent={true}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={images.liveNotification} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Can We Notify You?</Text>
          <Text style={styles.subtitle}>
            Please Allow us to send you Notifications
          </Text>
        </View>

        <PrimaryButton onPress={toggleModal} title={'ALLOW'} disabled={undefined} />
        <SecondaryButton onPress={toggleModal} title={'NO, OTHER TIME'} disabled={undefined} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(13),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  imageContainer: {
    backgroundColor: COLORS.primary,
    width: moderateScale(81),
    height: moderateVerticalScale(80),
    borderRadius: moderateScale(60, 0.3),
    padding: scale(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    marginTop: verticalScale(16),
  },
  image: {
    width: scale(44),
    height: verticalScale(50),
  },
  textContainer: {
    marginTop: verticalScale(12),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(35),
  },
  title: {
    fontFamily: FONTS.inriaSansRegular,
    fontSize: scale(20),
    color: COLORS.darkText,
    marginVertical: verticalScale(5),
  },
  subtitle: {
    fontFamily: FONTS.nunitoMedium,
    fontSize: scale(13),
    color: COLORS.lightText,
  },
});

export default BottomModal;
