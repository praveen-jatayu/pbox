import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colorConstant";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../constants/fontConstant";
const { height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
      },
      topSection: {
        height: height / 2.2,
      },
      imageBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      foregroundImage: {
        width: moderateScale(170),
        height: moderateVerticalScale(170),
      },
      middleSection: {
        flex: 2,
        alignSelf: 'center',
        marginTop: verticalScale(50),
        alignItems: 'center',
      },
      title: {
        fontFamily: FONTS.inriaSansBold,
        fontSize: scale(24),
        color: COLORS.darkText,
        textAlign: 'center',
      },
      subtitle: {
        fontFamily: FONTS.nunitoSemiBold,
        fontSize: scale(16),
        color: COLORS.lightText,
        marginTop: verticalScale(12),
        textAlign: 'center',
      },
      bottomSection: {
        position: 'absolute',
        width: '100%',
        bottom: verticalScale(25),
        alignItems: 'center',
      },
      bottomText: {
        fontFamily: FONTS.inriaSansRegular,
        color: COLORS.darkText,
        fontSize: scale(16),
        marginBottom: 10,
      },
})