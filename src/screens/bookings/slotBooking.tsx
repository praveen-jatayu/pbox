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
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomCheckBox from '../../components/checkbox';
import PrimaryButton from '../../components/primaryButton';

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
import slotBookingStyles from '../../assets/styles/slotBookingStyles';
import MainHeader from '../../components/mainHeader';


const SlotBooking = ({navigation, route}) => {
  

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
  );
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [availableCourts, setAvailableCourts] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [slotDetail, setSlotDetail] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [totalBookingAmount, setTotalBookingAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // date slection function
 

  return (
    <View style={[mainStyles.container]}>
      <MainHeader title={'Sky Box'} headerType='sub' onPressBack={()=>navigation.goBack()}/>
      <StatusBar
        // translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      
    </View>
  );
};

export default SlotBooking;

