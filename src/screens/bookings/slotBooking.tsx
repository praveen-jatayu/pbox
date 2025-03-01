import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useEffect, useState} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomCheckBox from '../../components/checkbox';
import PrimaryButton from '../../components/primaryButton';
import DateSlider from './dateSelector';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {RouteProp} from '@react-navigation/native';

import { icons } from '../../constants/Icon';
type SlotBookingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;
type SlotBookingRouteProp = RouteProp<RootStackParamList, 'Settings'>;

type SlotBookingProps = {
  navigation: SlotBookingNavigationProp;
  route: SlotBookingRouteProp;
};

const SlotBooking = ({navigation}: SlotBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<String>('');
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [availableCourts, setAvailableCourts] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ time: string; price: number; discount: number; available: boolean }[]>([]);
  
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
    
    // Fetch available courts for selected date
    fetchAvailableCourts(date);
  };
  
  const handleCourtSelection = (court: string) => {
    setSelectedCourt(court);
    console.log('Selected Court:', court);
  
    if (selectedDate) {
      fetchAvailableSlots(selectedDate, court);
    }
  };

  const fetchAvailableSlots = (date: string, court: string | null) => {
    if (!court) return; // Don't fetch if court is not selected
  
    // Simulate fetching data from an API
    const slots = [
      { time: '6:00 PM', price: 300, discount: 50, available: true },
      { time: '7:00 PM', price: 350, discount: 30, available: false },
      { time: '8:00 PM', price: 400, discount: 20, available: true },
    ];
    
    setAvailableSlots(slots);
  };
  const fetchAvailableCourts = (date: string) => {
    // Simulating API call to get available courts for the selected date
    const courts = ['C1', 'C2', 'C3', 'C4'];
    setAvailableCourts(courts);
  
    // Reset court selection when date changes
    setSelectedCourt(null);
    setAvailableSlots([]);
  };
  return (
    <View style={[mainStyles.container]}>
      <SubHeader
        title={'Box Name'}
        onPress={() => navigation.goBack()}
        style={{height: verticalScale(80), paddingTop: verticalScale(20)}}
      />
      <StatusBar
        // translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View>
        {/* Date picker  */}
        <View
          style={slotBookingStyles.datePickerContainer}>
          <Text
            style={[
              mainStyles.fontInriaSansRegular,
              mainStyles.darkTextColor,
              mainStyles.fontSize20,
            ]}>
            Date
          </Text>
          <DateSlider onDateSelected={handleDateSelection} />
        </View>
        {/* Court slection container */}

        <View style={slotBookingStyles.courtSelectionContainer}>
  <Text style={[mainStyles.darkTextColor, mainStyles.fontInriaSansRegular, mainStyles.fontSize20]}>
    Court
  </Text>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(12) }}>
    {availableCourts.length > 0 ? (
      availableCourts.map((court) => (
        <TouchableOpacity
          key={court}
          onPress={() => handleCourtSelection(court)}
          style={[
            mainStyles.secondaryBorderColor,
            mainStyles.borderWidth1,
            selectedCourt === court && mainStyles.primaryBackgroundColor,
            {
              paddingVertical: verticalScale(7),
              paddingHorizontal: scale(8),
              borderRadius: moderateScale(5),
             
            },
          ]}
        >
          <Text style={[mainStyles.primaryTextColor, mainStyles.fontSize14, mainStyles.fontNunitoMedium,selectedCourt === court && {color:'#FFFFFF'}]}>
            {court}
          </Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text>No courts available</Text>
    )}
  </View>
</View>
        {/* banner container */}
        <View
          style={[
            mainStyles.infoBackgroundColor,
            mainStyles.widthFull,
            slotBookingStyles.bannerContainer
          ]}>
          <Text
            style={[
              mainStyles.secondaryTextColor,
              mainStyles.fontNunitoSemibold,
              {fontSize: moderateScale(15, 0.8)},
            ]}>
            Be The First! Reserve This Court Before Anyone
          </Text>
        </View>
            {/* booking container */}
            {selectedDate && selectedCourt && availableSlots.length > 0 ? (
  availableSlots.map((slot, index) => (
    <View key={index} style={{ marginTop: verticalScale(10), paddingHorizontal: scale(16) }}>
      <View style={[mainStyles.flexContainer]}>
        <View>
          <Text style={[mainStyles.fontInriaSansRegular, mainStyles.fontSize16, mainStyles.darkTextColor]}>
            {slot.time}
          </Text>
          <Image source={icons.sunIcon} style={{ width: scale(24), height: verticalScale(24), marginTop: verticalScale(5) }} />
        </View>
        <TouchableOpacity 
          style={[
            slot.available ? mainStyles.secondaryBorderColor : { backgroundColor: '#FDEBE9', borderColor: '#FF4F0A' },
            mainStyles.borderWidth1,
            { alignItems: 'center', justifyContent: 'center', paddingVertical: verticalScale(7), paddingHorizontal: scale(60), borderRadius: moderateScale(5) },
          ]}
        >
          <Text style={[mainStyles.infoTextColor, mainStyles.fontInriaSansBold, mainStyles.fontSize16]}>
            {slot.discount}% Discount
          </Text>
          <Text style={[mainStyles.lightTextColor, mainStyles.fontNunitoRegular, mainStyles.fontSize14]}>
            {slot.available ? `Available ₹ ${slot.price}` : 'Booked'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ))
) : (
  <Text style={{ textAlign: 'center', marginTop: 20 }}>Select a date and court to view available slots</Text>
)}
    
      </View>
      {/* Bottom info container */}
      <View
        style={[
          mainStyles.secondaryBackgroundColor,
          mainStyles.dropShadowEffect,
          slotBookingStyles.bottomInfoContainer,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scale(10),
            }}>
            <CustomCheckBox style={undefined} disabled={true} />
            <Text
              style={[
                mainStyles.fontNunitoSemibold,
                mainStyles.fontSize14,
                mainStyles.darkTextColor,
              ]}>
              Booked
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scale(10),
            }}>
            <CustomCheckBox
              style={[
                mainStyles.borderWidth1,
                mainStyles.secondaryInfoBackgroundColor,
                mainStyles.infoBorderColor,
              ]}
            />
            <Text
              style={[
                mainStyles.fontNunitoSemibold,
                mainStyles.fontSize14,
                mainStyles.darkTextColor,
              ]}>
              Available
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scale(10),
            }}>
            <CustomCheckBox
              style={[
                mainStyles.borderWidth1,
                {backgroundColor: '#FDEBE9', borderColor: '#FF4F0A'},
              ]}
              disabled={true}
            />
            <Text
              style={[
                mainStyles.fontNunitoSemibold,
                mainStyles.fontSize14,
                mainStyles.darkTextColor,
              ]}>
              Selected
            </Text>
          </View>
        </View>

        <View
          style={[mainStyles.flexContainer, {marginTop: verticalScale(16)}]}>
          <View>
            <Text
              style={[
                mainStyles.fontInriaSansRegular,
                mainStyles.fontSize20,
                mainStyles.darkTextColor,
              ]}>
              TOTAL ₹300.00
            </Text>
            <Text
              style={[
                mainStyles.fontNunitoMedium,
                mainStyles.primaryTextColor,
                mainStyles.fontSize14,
              ]}>
              6:00 PM to 7:30 PM +
            </Text>
          </View>
          <PrimaryButton
            title={'CONTINUE'}
            style={{width: '50%'}}
            disabled={undefined}
            onPress={() => navigation.navigate('BookingConfirmation')}
          />
        </View>
      </View>
    </View>
  );
};

export default SlotBooking;

const slotBookingStyles = StyleSheet.create({
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
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courtSelectionContainer:{
    paddingHorizontal: moderateScale(12),
            paddingVertical: verticalScale(6),
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(20),
  },
  datePickerContainer:{
    paddingHorizontal: scale(12), 
    paddingTop: verticalScale(18)
  },
  bannerContainer:{
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(12),
  }
});
