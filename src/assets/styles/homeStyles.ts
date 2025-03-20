import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/color";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";


const HEADER_HEIGHT = moderateVerticalScale(80); // height of the header
const MIN_HEADER_HEIGHT = moderateVerticalScale(150); // height of the header
const homeStyles = StyleSheet.create({
    sportsContainer: {
        marginTop: verticalScale(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'110%'
      },
      sportItem: {
        alignItems: 'center',
       marginHorizontal:scale(17),
        marginBottom: verticalScale(10),
      },
      sportItemSelected: {
        borderWidth: 1,
        borderRadius: moderateScale(8),
        padding: scale(5),
        borderColor:COLORS.primary
      },
      sportLogoBackground: {
        width: moderateScale(40),
        height: moderateVerticalScale(40),
        borderRadius: moderateScale(30),
        backgroundColor: COLORS.itemBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(4),
      },
      sportLogo: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'contain',
      },
      searchAndListContainer: {
        marginTop: verticalScale(5),
        paddingHorizontal: scale(10),
      },
      flatListContainer: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(300),
      },
    
      animatedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: 10,
      },
      animatedFilter: {
        top: HEADER_HEIGHT - moderateVerticalScale(90),
        left: 0,
        right: 0,
        paddingHorizontal: scale(5),
        zIndex: 12,
      },
      animatedSlider: {
        top: HEADER_HEIGHT - moderateVerticalScale(90),
        left: 0,
        right: 0,
        paddingHorizontal: scale(5),
        marginTop: verticalScale(70),
        zIndex: 12,
      },
      animatedSearch: {
        top: HEADER_HEIGHT - moderateVerticalScale(80),
        left: 0,
        right: 0,
        paddingHorizontal: scale(5),
        marginHorizontal:scale(10),
        zIndex: 12,
      },
      
})
export default homeStyles