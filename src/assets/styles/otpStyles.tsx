import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/color';
import { FONTS } from '../../constants/font';

const otpStyles = StyleSheet.create({
  foregroundImage: {
    borderRadius: moderateScale(50),
    marginTop: verticalScale(100),
  },
  otpLabelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneNumberText: {
    fontFamily: FONTS.nunitoSemiBold,
    fontSize: scale(12),
    color: COLORS.darkText,
    textDecorationLine: 'underline',
  },
  otpInputContainer: {
    width: '100%',
    marginTop: verticalScale(1),
  },
  otpField: {
    width: scale(49),
    height: verticalScale(44),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    fontFamily: FONTS.nunitoMedium,
    fontSize: scale(16),
    color: COLORS.darkText,
  },
  otpFieldError: {
    borderColor: COLORS.errorColor, // Highlight border if there's an error
  },
  errorText: {
    color: COLORS.errorColor,
    fontSize: scale(12),
    fontFamily: FONTS.nunitoRegular,
    marginTop: verticalScale(5),
    textAlign: 'left',
  },
});

export default otpStyles;
