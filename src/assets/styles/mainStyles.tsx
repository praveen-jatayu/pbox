import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colorConstant";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../constants/fontConstant";

const { height } = Dimensions.get('window');

export default mainStyles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
      },
  
})