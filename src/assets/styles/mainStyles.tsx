import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/color";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../constants/font";

const { height } = Dimensions.get('window');

export default mainStyles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
      },
      flexContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      widthFull:{
        width:'100%'
      },
      dropShadowEffect:{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
      },
      darkTextColor:{
        color:COLORS.darkText
      },
      lightTextColor:{
        color:COLORS.lightText,
      },
      primaryTextColor:{
        color:COLORS.primary
      },
      primaryBorderColor:{
        borderColor:COLORS.borderColor
      },
      secondaryBorderColor:{
       borderColor:COLORS.lightBorder
      },
      primaryBackgroundColor:{
        backgroundColor:COLORS.primary
      },
      secondaryBackgroundColor:{
        backgroundColor:COLORS.secondary
      },
      fontNunitoBold:{
        fontFamily:FONTS.nunitoBold
      },
      fontNunitoRegular:{
        fontFamily:FONTS.nunitoRegular
      },
      fontNunitoSemibold:{
        fontFamily:FONTS.nunitoSemiBold
      },
      fontNunitoMedium:{
        fontFamily:FONTS.nunitoMedium
      },
      fontInriaSansBold:{
        fontFamily:FONTS.inriaSansBold
      },
      fontInriaSansRegular:{
        fontFamily:FONTS.inriaSansRegular
      },
      fontInriaSansLight:{
        fontFamily:FONTS.inriaSansLight
      },
      fontSize22:{
        fontSize:scale(22)
      },
      fontSize20:{
        fontSize:scale(22)
      },
      fontSize18:{
        fontSize:scale(18)
      },
      fontSize14:{
        fontSize:scale(14)
      },
      fontSize16:{
        fontSize:scale(16)
      },
      fontSize12:{
        fontSize:scale(12)
      },
      marginTop10:{
        marginTop:verticalScale(10)
      },
      marginTop20:{
        marginTop:verticalScale(20)
      }
      




  
})