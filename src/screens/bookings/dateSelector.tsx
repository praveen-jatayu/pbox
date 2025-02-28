import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

const DateScrollBar = ({
  initialMonthYear = moment().format('YYYY-MM'),
  selectedDate: parentSelectedDate,
  onDateSelected,
  onSelectedDateChange,
}) => {

  const [monthYear, setMonthYear] = useState(initialMonthYear);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    parentSelectedDate || moment().format('DD'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MM'));
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const flatListRef = useRef(null);

  // Update the dates whenever the monthYear changes
  useEffect(() => {
    const [year, month] = monthYear.split('-');
    const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    const dateArray = [];

    for (let month = 1; month <= 12; month++) {
             const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    
             for (let day = 1; day <= daysInMonth; day++) {
               const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
               dateArray.push({
                day: date.format('ddd'),
                 date: date.format('DD'),
                 month: date.format('MM'),
               });
             }
           }
        
           setDates(dateArray);

    // Scroll logic to center selected date or today
    const today = moment().format('DD');
    const currentMonthYear = moment().format('YYYY-MM');

    let defaultScrollIndex = dateArray.findIndex(
      date => date.date === selectedDate,
    );
    if (monthYear === currentMonthYear && defaultScrollIndex === -1) {
      // If the selected date is not found, fallback to today's date
      defaultScrollIndex = dateArray.findIndex(date => date.date === today);
    }

    // Ensuring the scroll only happens after the data is fully loaded and rendered
    setTimeout(() => {
      if (defaultScrollIndex !== -1) {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: defaultScrollIndex,
          viewPosition: 0.5, // Center the selected date
        });
      }
    }, 150);
  }, [monthYear, selectedDate]); // Depend on both monthYear and selectedDate for changes

  // Handle arrow key navigation for month changes
  const changeMonthYear = direction => {
    const newMonthYear = moment(monthYear, 'YYYY-MM')
      .add(direction, 'month')
      .format('YYYY-MM');
    setMonthYear(newMonthYear);

    if (newMonthYear === moment().format('YYYY-MM')) {
      const today = moment().format('DD');
      setSelectedDate(today);
      onSelectedDateChange && onSelectedDateChange(today); // Notify parent
    } else {
      setSelectedDate('');
      onSelectedDateChange && onSelectedDateChange(''); // Notify parent
    }
  };

  const handleDatePress = day => {
    const monthNames = moment.months();

    if (day === selectedDate) return; // Prevent unnecessary scroll if the same date is clicked again
  
    setSelectedDate(day);
    onSelectedDateChange && onSelectedDateChange(day);
  
    const index = dates.findIndex(date => date.date === day);
    if (index !== -1) {
      const monthName = monthNames[dates[index].month - 1]; // Get the month name from the month number
      const selectedFullDate = `${year} ${monthName} ${day}`;
      onDateSelected && onDateSelected(selectedFullDate);
    }
  
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5, // Center the selected date
    });
  };

  const renderDate = ({item}) => 
  {
    console.log(item)
    return(
        <TouchableOpacity
        style={[
          styles.dateContainer,
          item.date === selectedDate && styles.selectedDateContainer,
        ]}
        onPress={() => handleDatePress(item.date)}>
        <Text
          style={[
            styles.dayText,
            item.date === selectedDate && styles.selectedDayText,
          ]}>
          {item.day}
        </Text>
        <Text
          style={[
            styles.dateText,
            item.date === selectedDate && styles.selectedDateText,
          ]}>
          {item.date}
        </Text>
      </TouchableOpacity>
    )

  }
    
  


  const initialScrollIndex =
    dates.length > 0
      ? dates.findIndex(date => date.date !== selectedDate) || 0
      : 0;

  return (
    <View style={styles.container}>
     
      <FlatList
        ref={flatListRef}
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.date}
        renderItem={renderDate}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 65 * index,
          index,
        })}
        initialScrollIndex={initialScrollIndex}
        onScrollToIndexFailed={info => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }, 50);
        }}
      />
    </View>
  );
};

export default DateScrollBar;

const styles =StyleSheet.create({
      container: {
        paddingVertical: 10,
        backgroundColor: 'transparent',
      },
      picker: {
        borderColor: '#232323',
        borderWidth: 1,
        backgroundColor: '#f5f5f5',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      monthYearText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'red',
      },
      modalContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      pickerContainer: {
        backgroundColor: '#FFF',
        margin: 20,
        padding: 20,
        borderRadius: 10,
      },
      pickerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#232323',
      },
      dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 50,
        marginHorizontal: 5,
      },
      selectedDateContainer: {
        backgroundColor:  '#232323',
      },
      dayText: {
        fontSize: 14,
        color: '#6b7280',
      },
      dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
      },
      selectedDayText: {
        color:  '#FFFFFF',
      },
      selectedDateText: {
        color: '#FFFFFF',
      },
    });
  
