import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import {moderateScale, moderateVerticalScale, scale, verticalScale} from 'react-native-size-matters';
import CustomCheckBox from '../../components/checkbox';
import PrimaryButton from '../../components/primaryButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {RouteProp} from '@react-navigation/native';

import {icons} from '../../constants/Icon';
import {
  addBooking,
  getCourtByBoxId,
  getSlotDetailByDate,
} from '../../services/bookingService';
import {formatTimeTo12Hour} from '../../utils/timeCoverterUtil';
import NoDataContainer from '../../components/noDataContainer';
import SlotContainerSkeleton from './slotContainerSkeleton';
import DateSlider from '../../utils/dateSelectorUtil';
type SlotBookingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SlotBooking'
>;
type SlotBookingRouteProp = RouteProp<RootStackParamList, 'SlotBooking'>;

type SlotBookingProps = {
  navigation: SlotBookingNavigationProp;
  route: SlotBookingRouteProp;
};

const SlotBooking = ({navigation, route}: SlotBookingProps) => {
  const {boxInfo} = route?.params;

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
  );
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [availableCourts, setAvailableCourts] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [slotDetail, setSlotDetail] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const[totalBookingAmount,setTotalBookingAmount]=useState(0)
  const [loading, setLoading] = useState(true);

  // date slection function
  const handleDateSelection = (date: string) => {
    
    setSelectedDate(date);
    if (selectedCourt) {
      fetchAvailableAndBookedSlots(date, selectedCourt);
    }
  };
// court selection function
  const handleCourtSelection = (court: string) => {
    setSelectedCourt(court.id);
    if (selectedDate) {
      fetchAvailableAndBookedSlots(selectedDate, court.id);
    }
  };
// api call to fetch available and booked slots
  const fetchAvailableAndBookedSlots = async (date: string,courtId: string | null, ) => {
    if (!courtId) return;

    const formData = new FormData();
    formData.append('booking_date', date);
    formData.append('box_court_id', courtId);
    try {
      const response = await getSlotDetailByDate(formData);
      
      setSlotDetail(response.all_slots);
      setBookedSlots(response.booked_slot)
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    }
    finally{
      setLoading(false)
    }
  };
// api call to fetch available courts
  const fetchCourtByBoxId = async boxData => {
    const formData = new FormData();
    formData.append('box_id', boxData.id);

    try {
      const response = await getCourtByBoxId(formData);
      if (response) {
        setAvailableCourts(response);
        setSelectedCourt(response[0].id);
        await fetchAvailableAndBookedSlots(selectedDate, response[0].id);
      } else {
        console.error('Error occurred:', response.error);
      }
    } catch (error) {
      console.error('Failed to fetch box data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourtByBoxId(boxInfo);
  }, []);


  const handleSlotSelection = (slotId,slotPrice) => {
    const numericPrice = parseFloat(slotPrice); // Ensure it's treated as a number
    setSelectedSlot(prevState => {
      const updatedSlots = {...prevState};
  
      // Initialize date entry if it doesn't exist
      if (!updatedSlots[selectedDate]) {
        updatedSlots[selectedDate] = {};
      }
  
      // Initialize court entry if it doesn't exist
      if (!updatedSlots[selectedDate][selectedCourt]) {
        updatedSlots[selectedDate][selectedCourt] = [];
      }
  
      const courtSlots = updatedSlots[selectedDate][selectedCourt];
  
      // Add or remove slot ID
      if (courtSlots.includes(slotId)) {
        updatedSlots[selectedDate][selectedCourt] = courtSlots.filter(id => id !== slotId);

           // **Subtract slot price when removed**
           setTotalBookingAmount(prevAmount => (parseFloat(prevAmount) - numericPrice).toFixed(2));
  
        // Remove court entry if no slots remain
        if (updatedSlots[selectedDate][selectedCourt].length === 0) {
          delete updatedSlots[selectedDate][selectedCourt];
        }
      } else {
        updatedSlots[selectedDate][selectedCourt].push(slotId);
           // **Add slot price when added**
      setTotalBookingAmount(prevAmount => (parseFloat(prevAmount) + numericPrice).toFixed(2));;
      }
  
      // Remove date entry if no courts remain
      if (Object.keys(updatedSlots[selectedDate]).length === 0) {
        delete updatedSlots[selectedDate];
      }
  
      return updatedSlots;
    });
  };

  const isSlotSelected = (slotId) => {
    console.log('eeh',selectedSlot)
    const dateEntry = selectedSlot[selectedDate];
  
    if (!dateEntry) return false; // No slots for the selected date
  
    // Check if the court exists and contains the slotId
    return dateEntry[selectedCourt]?.includes(slotId) || false;
  };

  const hasSlotsInCourt = (courtId) => {
    const dateEntry = selectedSlot[selectedDate];
  
    if (!dateEntry) return false; // No slots for the selected date
  
    return !!dateEntry[courtId] && dateEntry[courtId].length > 0;
  };

  const slotCount = useMemo(() => {
    const slotCountMap = {};
    
    Object.keys(selectedSlot).forEach((date) => {
      const courts = selectedSlot[date];
      const totalSlots = Object.values(courts).reduce(
        (sum, slots) => sum + slots.length,
        0
      );
  
      if (totalSlots > 0) {
        slotCountMap[date] = totalSlots;
      }
    });
  
    return slotCountMap;
  }, [selectedSlot]);

  

  return (
    <View style={[mainStyles.container]}>
      <SubHeader
        title={boxInfo.title}
        onPress={() => navigation.goBack()}
        style={[{height: verticalScale(80), paddingTop: verticalScale(20),gap:scale(110)},boxInfo.title.length>10 &&{ gap:scale(90)},boxInfo.title.length>=20 &&{ gap:scale(60)}]}
      />
      <StatusBar
        // translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View>
        {/* Date picker  */}
        <View style={slotBookingStyles.datePickerContainer}>
          <Text
            style={[
              mainStyles.fontInriaSansRegular,
              mainStyles.darkTextColor,
              mainStyles.fontSize20,
            ]}>
            Date
          </Text>
          <DateSlider onDateSelected={handleDateSelection} countLabel={slotCount}/>
        </View>
        {/* Court slection container */}

        <View style={slotBookingStyles.courtSelectionContainer}>
          <Text
            style={[
              mainStyles.darkTextColor,
              mainStyles.fontInriaSansRegular,
              mainStyles.fontSize20,
            ]}>
            Court
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(12),
            }}>
            {loading ? (
              // Skeleton Loader for Court Selection
              Array.from({length: 4}).map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: moderateScale(35),
                    height: moderateVerticalScale(35),
                    backgroundColor: '#E0E0E0', // Skeleton background
                    borderRadius: moderateScale(5),
                    opacity: 0.6,
                  }}
                />
              ))
            ) : availableCourts.length > 0 ? (
              availableCourts.map(court => (
                <TouchableOpacity
                  key={court.id}
                  onPress={() => handleCourtSelection(court)}
                  style={[
                    mainStyles.secondaryBorderColor,
                    mainStyles.borderWidth1,
                    selectedCourt === court.id &&
                      mainStyles.primaryBackgroundColor,
                    {
                      borderRadius: moderateScale(5),
                      height:moderateVerticalScale(35),
                      width:moderateScale(35),
                      alignItems:'center',
                      justifyContent:'center'
                    },
                  ]}>
                    <View>
                      {hasSlotsInCourt(court.id) && 
                    <View style={[{height:verticalScale(4),width:moderateScale(4),borderRadius:moderateScale(10),position:'absolute',right:moderateScale(-7),top:moderateVerticalScale(-3)},mainStyles.primaryBackgroundColor,selectedCourt===court.id && mainStyles.secondaryBackgroundColor]}/>
                      }
                  <Text
                    style={[
                      mainStyles.primaryTextColor,
                      mainStyles.fontSize14,
                      mainStyles.fontNunitoMedium,
                      selectedCourt === court.id && {color: '#FFFFFF'},
                    ]}>
                    {court?.name}
                  </Text>
                  </View>
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
            slotBookingStyles.bannerContainer,
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
        <ScrollView
          style={{maxHeight: verticalScale(300)}}
          contentContainerStyle={{paddingBottom: verticalScale(100)}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {loading ? (
              // Skeleton Loader for Court Selection
              Array.from({length: 4}).map((_, index) => (
              <SlotContainerSkeleton   key={index}/>
              ))
              ):selectedDate && selectedCourt && slotDetail.length > 0 ? (
            slotDetail.map((slot, index) => (
              <View
                key={index}
                style={{
                  marginTop: verticalScale(10),
                  paddingHorizontal: scale(16),
                  paddingBottom: verticalScale(12),
                }}>
                <View style={[mainStyles.flexContainer]}>
                  <View>
                    <Text
                      style={[
                        mainStyles.fontInriaSansRegular,
                        mainStyles.fontSize16,
                        mainStyles.darkTextColor,
                      ]}>
                      {formatTimeTo12Hour(slot?.get_single_slot?.start_time)}-{' '}
                      {formatTimeTo12Hour(slot?.get_single_slot?.end_time)}
                    </Text>
                    <Image
                      source={
                        slot?.get_single_slot?.start_time >= '19:00:00'
                          ? icons.moonIcon
                          : icons.sunIcon
                      }
                      style={{
                        width: scale(24),
                        height: verticalScale(24),
                        marginTop: verticalScale(5),
                      }}
                    />
                  </View>
                  
                  <TouchableOpacity
                  onPress={() => handleSlotSelection(slot?.id,slot?.rate)}
                    disabled={bookedSlots.includes(slot?.id)}
                    style={[
                      mainStyles.borderWidth1,
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: verticalScale(15),
                        paddingHorizontal: scale(6),
                        borderRadius: moderateScale(5),
                        width: '50%',
                      },
                      !bookedSlots.includes(slot.id)
                      ? isSlotSelected(slot.id) 
                          ? {backgroundColor: '#FDEBE9', borderColor: '#FF4F0A'} // Selected slot
                          : [
                              mainStyles.secondaryInfoBackgroundColor,
                              mainStyles.infoBorderColor,
                            ] // Available slot
                        : [
                           {backgroundColor:'#D3D3D3'},
                            mainStyles.primaryBorderColor,
                          ], // Booked slot
                    ]}>
                    <Text
                      style={[
                        mainStyles.infoTextColor,
                        mainStyles.fontInriaSansBold,
                        mainStyles.fontSize16,
                        bookedSlots.includes(slot.id) && mainStyles.lightTextColor,
                      ]}>
                      {slot?.discount || '50'}% Discount
                    </Text>
                    <Text
                      style={[
                        mainStyles.lightTextColor,
                        mainStyles.fontNunitoRegular,
                        mainStyles.fontSize14,
                      ]}>
                      {!bookedSlots.includes(slot.id)
                        ? ` ₹ ${slot?.rate || '---'}`
                        : ''}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <NoDataContainer
              style={{marginTop: verticalScale(50)}}
              noDataText={'No slots available'}
            />
          )}
        </ScrollView>
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
            <CustomCheckBox style={{backgroundColor:'#D3D3D3'}} disabled={true} />
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
            {totalBookingAmount ===0 ? (
              <Text style={[
                mainStyles.fontInriaSansRegular,
                mainStyles.fontSize16,
                mainStyles.primaryTextColor,
              ]}>No Slots Selected!!</Text>
            ):(
            <Text
              style={[
                mainStyles.fontInriaSansRegular,
                mainStyles.fontSize20,
                mainStyles.primaryTextColor,
              ]}>
              TOTAL : ₹ {totalBookingAmount}
            </Text>
            )}
          
          <PrimaryButton
            title={'CONTINUE'}
            style={{width: '50%'}}
            disabled={Object.keys(selectedSlot).length === 0 }
            onPress={() => navigation.navigate('BookingConfirmation',{slotBookingData:selectedSlot,boxData:boxInfo,totalAmountToBePaid:totalBookingAmount})}
            
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
  courtSelectionContainer: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
  },
  datePickerContainer: {
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(18),
  },
  bannerContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(12),
  },
});
