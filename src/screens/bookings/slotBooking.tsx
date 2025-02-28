import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import SubHeader from '../../components/subHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomCheckBox from '../../components/checkbox'
import PrimaryButton from '../../components/primaryButton'
import DateSlider from './dateSelector'

const SlotBooking = ({navigation}) => {
  
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
    // Fetch available courts and slots based on the selected date
  };
  return (
    <View style={[mainStyles.container]}>
    <SubHeader title={'Box Name'} onPress={()=>navigation.goBack()}   style={{height: verticalScale(80), paddingTop: verticalScale(20)}} />
    <StatusBar
            // translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <View >
          {/* Date picker  */}
          <View style={{paddingHorizontal:scale(12),paddingTop:verticalScale(18)}}>
            <Text style={[mainStyles.fontInriaSansRegular,mainStyles.darkTextColor,mainStyles.fontSize20]}>Date</Text>
            <DateSlider onDateSelected={handleDateSelection} />
          </View>
          {/* Court slection container */}

          <View style={{paddingHorizontal:moderateScale(12),paddingVertical:verticalScale(15),flexDirection:'row',alignItems:'center',gap:scale(20)}}>
            <Text style={[mainStyles.darkTextColor,mainStyles.fontInriaSansRegular,mainStyles.fontSize20]}>Court</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:moderateScale(12)}}>
            <TouchableOpacity style={[mainStyles.secondaryBorderColor,mainStyles.borderWidth1,{paddingVertical:verticalScale(7),paddingHorizontal:scale(8),borderRadius:moderateScale(5)}]}>
              <Text style={[mainStyles.primaryTextColor,mainStyles.fontSize14,mainStyles.fontNunitoMedium]}>C1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyles.secondaryBorderColor,mainStyles.borderWidth1,{paddingVertical:verticalScale(7),paddingHorizontal:scale(8),borderRadius:moderateScale(5)}]}>
              <Text style={[mainStyles.primaryTextColor,mainStyles.fontSize14,mainStyles.fontNunitoMedium]}>C2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyles.secondaryBorderColor,mainStyles.borderWidth1,{paddingVertical:verticalScale(7),paddingHorizontal:scale(8),borderRadius:moderateScale(5)}]}>
              <Text style={[mainStyles.primaryTextColor,mainStyles.fontSize14,mainStyles.fontNunitoMedium]}>C3</Text>
            </TouchableOpacity>
            </View>
          </View>
          {/* banner container */}
      <View style={[mainStyles.infoBackgroundColor,mainStyles.widthFull,{paddingHorizontal:scale(10),paddingVertical:verticalScale(10),marginVertical:verticalScale(12)}]}>
        <Text style={[mainStyles.secondaryTextColor,mainStyles.fontNunitoSemibold,{fontSize:moderateScale(15,0.8)}]}>Be The First! Reserve This Court Before Anyone</Text>
      </View>
          </View>
{/* Bottom info container */}
          <View style={[mainStyles.secondaryBackgroundColor,mainStyles.dropShadowEffect,slotBookingStyles.bottomInfoContainer]}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:scale(10)}}>
               <CustomCheckBox style={undefined} disabled={true}/>
                <Text style={[mainStyles.fontNunitoSemibold,mainStyles.fontSize14,mainStyles.darkTextColor]}>Booked</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',gap:scale(10)}}>
               <CustomCheckBox style={[mainStyles.borderWidth1,mainStyles.neutralBackgroundColor,mainStyles.neutralBorderColor]}/>
                <Text style={[mainStyles.fontNunitoSemibold,mainStyles.fontSize14,mainStyles.darkTextColor]}>Available</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',gap:scale(10)}}>
               <CustomCheckBox style={[mainStyles.borderWidth1,{backgroundColor:'#FDEBE9',borderColor:'#FF4F0A'}]} disabled={true}/>
                <Text style={[mainStyles.fontNunitoSemibold,mainStyles.fontSize14,mainStyles.darkTextColor]}>Selected</Text>
              </View>
              </View>

              <View style={[mainStyles.flexContainer,{marginTop:verticalScale(16)}]}>
                <View>
                  <Text style={[mainStyles.fontInriaSansRegular,mainStyles.fontSize20,mainStyles.darkTextColor]}>TOTAL ₹300.00</Text>
                  <Text style={[mainStyles.fontNunitoMedium,mainStyles.primaryTextColor,mainStyles.fontSize14]}>6:00 PM to 7:30 PM +</Text>
                </View>
                <PrimaryButton title={'CONTINUE'} style={{width:'50%'}} disabled={undefined} onPress={()=>navigation.navigate('BookingConfirmation')} />
              </View>

          </View>
    </View>
  )
}

export default SlotBooking;

const slotBookingStyles=StyleSheet.create({
  bottomInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(110),
    width: '100%',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    paddingBottom: verticalScale(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
})