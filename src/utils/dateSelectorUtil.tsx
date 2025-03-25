import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AppState,
  AppStateStatus
} from 'react-native';
import moment from 'moment';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import mainStyles from '../assets/styles/mainStyles';

interface DateItem {
  formattedDate: string;
  displayDay: string;
  displayDate: string;
  displayMonth: string;
}
interface DateSliderProps {
  onDateSelected: (date: string) => void;
  countLabel: Record<string, number>;
}

const DateSlider: React.FC<DateSliderProps> = ({onDateSelected,countLabel}) => {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );
  const listRef = useRef<FlatList<DateItem>>(null);

  useEffect(() => {
    generateWeeklyDates(moment().format('YYYY-MM-DD')); // Load weekly dates
    setSelectedDate(moment().format('YYYY-MM-DD')); // Set today's date
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState:AppStateStatus) => {
      if (nextAppState === 'active') {
        const currentDate = moment().format('YYYY-MM-DD');

        if (currentDate !== selectedDate) {
          setSelectedDate(currentDate);
          generateWeeklyDates(currentDate); // Update week dates
          onDateSelected(currentDate);
        }
      }
    };

    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateListener.remove();
    };
  }, [selectedDate]);

  // Generate weekly dates based on the selected date
  const generateWeeklyDates = (startDate:string) => {
    let tempDates:DateItem[] = [];
    let currentDate = moment(startDate); // Start from today's date

    for (let i = 0; i < 7; i++) {
      tempDates.push({
        formattedDate: currentDate.format('YYYY-MM-DD'),
        displayDay: currentDate.format('ddd'),
        displayDate: currentDate.format('DD'),
        displayMonth: currentDate.format('MMM'),
      });
      currentDate = currentDate.add(1, 'day');
    }

    setDates(tempDates);
  };

  // Handle date selection
  const handleDateSelection = (date:string) => {
    setSelectedDate(date);
    onDateSelected(date);

    // Check if selected date is outside the current range
    const isOutsideCurrentWeek = !dates.some(d => d.formattedDate === date);
    if (isOutsideCurrentWeek) {
      generateWeeklyDates(date);
    }
  };

  return (
    <FlatList<DateItem>
      ref={listRef}
      data={dates}
      horizontal
      keyExtractor={item => item.formattedDate}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={dates.findIndex(
        d => d.formattedDate === selectedDate,
      )}
      getItemLayout={(data, index) => ({
        length: scale(70),
        offset: scale(70) * index,
        index,
      })}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[
            styles.dateCard,
            selectedDate === item.formattedDate &&
              mainStyles.primaryBackgroundColor,
            mainStyles.borderWidth1,
            mainStyles.secondaryBorderColor,
          ]}
          onPress={() => handleDateSelection(item.formattedDate)}
          activeOpacity={0.8}>
            {/* count label */}
            {countLabel[item.formattedDate] > 0 && (
            <View
              style={{
                width: moderateVerticalScale(17),
                height: moderateVerticalScale(17),
                position: 'absolute',
                borderRadius: moderateScale(10),
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                top: verticalScale(-8),
                right: moderateScale(-2),
              }}
            >
              <Text
                style={[
                  mainStyles.secondaryTextColor,
                  mainStyles.fontSize12,
                  mainStyles.fontInriaSansRegular,
                ]}
              >
                {countLabel[item.formattedDate]}
              </Text>
            </View>
          )}
          <Text
            style={[
              mainStyles.primaryTextColor,
              mainStyles.fontNunitoMedium,
              mainStyles.fontSize14,
              selectedDate === item.formattedDate &&
                mainStyles.secondaryTextColor,
            ]}>
            {item.displayDay}
          </Text>
          <Text
            style={[
              mainStyles.darkTextColor,
              mainStyles.fontNunitoBold,
              mainStyles.fontSize14,
              selectedDate === item.formattedDate &&
                mainStyles.secondaryTextColor,
            ]}>
            {item.displayDate}
          </Text>
          <Text
            style={[
              mainStyles.darkTextColor,
              mainStyles.fontNunitoMedium,
              mainStyles.fontSize14,
              selectedDate === item.formattedDate &&
                mainStyles.secondaryTextColor,
            ]}>
            {item.displayMonth}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default DateSlider;

const styles = StyleSheet.create({
  dateCard: {
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(12),
    marginHorizontal: scale(7),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    gap: verticalScale(4),
  },
});
