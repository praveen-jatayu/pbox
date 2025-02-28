import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import SubHeader from '../../components/subHeader'
import { scale, verticalScale } from 'react-native-size-matters'
import CustomCheckBox from '../../components/checkbox'
import PrimaryButton from '../../components/primaryButton'

const SlotBooking = ({navigation}) => {
  

  return (
    <View style={mainStyles.container}>
    <SubHeader title={'Box Name'} onPress={()=>navigation.goBack()}   style={{height: verticalScale(80), paddingTop: verticalScale(20)}} />
    <StatusBar
            // translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <View style={{paddingHorizontal:scale(12),paddingTop:verticalScale(18)}}>
          {/* Date picker  */}
          <View>
            <Text style={[mainStyles.fontInriaSansRegular,mainStyles.darkTextColor,mainStyles.fontSize20]}>Date</Text>
            {/* <DateScrollBar
          selectedDate={selectedDate}
          initialMonthYear={moment().format('YYYY-MM')}
          onDateSelected={handleDateSelected}
        /> */}
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
  bottomInfoContainer:{
position:'absolute',
bottom:0,
left:0,
right:0,
height:verticalScale(110),
width:'100%',
paddingHorizontal:scale(12),
paddingVertical:verticalScale(12),
paddingBottom:verticalScale(30)
  }
})