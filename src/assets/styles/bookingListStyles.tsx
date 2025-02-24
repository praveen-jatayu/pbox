import { StyleSheet } from "react-native"
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters"
import mainStyles from "./mainStyles"

export default bookingListStyles=StyleSheet.create({
    
    innerContainer: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(12),
      },
      filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scale(12),
        marginVertical: verticalScale(10),
      },
      filterButton: {
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(12),
        borderRadius: moderateScale(12),
      },
      filterTextActive: {
        color: '#ffffff',
      },
      listContainer: {
        paddingHorizontal: scale(8),
        paddingBottom: verticalScale(20),
      },
      noDataContainer: {
        marginTop: verticalScale(50),
      },
      bookingCardContainer: {
        borderRadius: moderateScale(7),
        marginVertical: verticalScale(10),
        paddingHorizontal: scale(7),
        paddingVertical: verticalScale(7),
        overflow: 'hidden',
        alignSelf: 'center',
      },
      courtImage: {
        width: scale(90),
        height: verticalScale(114),
        borderRadius: moderateScale(7),
        resizeMode: 'cover',
      },
      bookingCardContent: {
        flex: 1,
        paddingLeft: scale(10),
      },
      categoryHeaderContainer: {
        paddingBottom: verticalScale(5),
      },
      sportsCategoryImage: {
        width: scale(16),
        height: verticalScale(16),
      },
      titleAddressContainer: {
        flexDirection: 'row',
      },
      titleAddressInnerContainer: {
        width: '70%',
      },
      addressContainer: {
        ...mainStyles.flexContainer,
        width: '100%',
        gap: scale(30),
      },
      addressText: {
        paddingTop: verticalScale(7),
      },
      slotCountContainer: {
        width: moderateScale(24, 0.8),
        height: moderateVerticalScale(24),
        borderRadius: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
      },
      slotCountText: {
        color: '#ffffff',
        fontSize: scale(12),
      },
      dateSlotContainer: {
        paddingTop: verticalScale(16),
        width: '100%',
      },
})