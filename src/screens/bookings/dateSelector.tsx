import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,AppState } from 'react-native';
import moment from 'moment';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import mainStyles from '../../assets/styles/mainStyles';

const DateSlider = ({ onDateSelected }) => {

  type DateItem = {
    formattedDate: string;
    displayDay: string;
    displayDate: string;
    displayMonth: string;
  };
  const [dates, setDates] = useState<DateItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const listRef = useRef(null);

  useEffect(() => {
    generateDates(moment().format('YYYY-MM')); // Load current month dates
    setSelectedDate(moment().format('YYYY-MM-DD')); // Set today's date
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        const currentDate = moment().format('YYYY-MM-DD');
        const currentMonth = moment().format('YYYY-MM');
  
        if (currentDate !== selectedDate) {
          setSelectedDate(currentDate);
          if (moment(selectedDate).format('YYYY-MM') !== currentMonth) {
            generateDates(currentMonth); // Load the new month's dates
          }
          onDateSelected(currentDate);
        }
      }
    };
  
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };

  }, [selectedDate]);

  // Function to generate dates for the current month
  const generateDates = (monthYear: moment.MomentInput) => {
    let startDate = moment(monthYear, 'YYYY-MM').startOf('month');
    let endDate = moment(monthYear, 'YYYY-MM').endOf('month');
    let tempDates = [];

    while (startDate <= endDate) {
      tempDates.push({
        formattedDate: startDate.format('YYYY-MM-DD'),
        displayDay: startDate.format('ddd'),
        displayDate: startDate.format('DD'),
        displayMonth: startDate.format('MMM'),
      });
      startDate = startDate.add(1, 'day');
    }

    setDates(tempDates);
  };

  // Function to handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    onDateSelected(date);
  };

  return (
    <FlatList
      ref={listRef}
      data={dates}
      horizontal
      keyExtractor={(item) => item.formattedDate}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={dates.findIndex((d) => d.formattedDate === selectedDate)}
      getItemLayout={(data, index) => ({
        length: scale(70),
        offset: scale(70) * index,
        index,
      })}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.dateCard, selectedDate === item.formattedDate && mainStyles.primaryBackgroundColor,mainStyles.borderWidth1,mainStyles.secondaryBorderColor]}
          onPress={() => handleDateSelection(item.formattedDate)}
       activeOpacity={0.8} >
          <Text style={[mainStyles.primaryTextColor,mainStyles.fontNunitoMedium,mainStyles.fontSize14,selectedDate === item.formattedDate && mainStyles.secondaryTextColor]}>{item.displayDay}</Text>
          <Text style={[mainStyles.darkTextColor,mainStyles.fontNunitoBold,mainStyles.fontSize14, selectedDate === item.formattedDate && mainStyles.secondaryTextColor]}>{item.displayDate}</Text>
          <Text style={[mainStyles.darkTextColor,mainStyles.fontNunitoMedium,mainStyles.fontSize14,selectedDate === item.formattedDate && mainStyles.secondaryTextColor]}>{item.displayMonth}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default DateSlider;

const styles = StyleSheet.create({
  dateCard: {
   paddingVertical:verticalScale(7),
   paddingHorizontal:scale(15),
    marginVertical:verticalScale(12),
    marginHorizontal:scale(7),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    gap:verticalScale(4)
  },
  
 
});
