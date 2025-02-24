import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import CustomTopHeader from '../../components/mainHeader';
import SearchInput from '../../components/searchInput';
import { images } from '../../constants/image';
import NoDataContainer from '../../components/noDataContainer';
import bookingListStyles from '../../assets/styles/bookingListStyles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MainHeader from '../../components/mainHeader';

const bookingCategories = ['Upcoming', 'Completed', 'Cancelled'];

const dummyBookings = [
  {
    id: '1',
    courtImage: images.scenic,
    availableSports: ['Football', 'Basketball'],
    date: '14/jan/2025',
    title: 'Sports Hub',
    address: '456 Sporty Ave, Game City',
    category: 'Upcoming',
    slotTiming: '10:00 AM - 11:30 AM',
  },
  {
    id: '2',
    courtImage: images.scenic,
    availableSports: ['Cricket'],
    date: '14/jan/2025',
    title: 'Cricket Arena',
    address: '123 Cricket Lane, Sportstown',
    category: 'Completed',
    slotTiming: '2:00 PM - 3:00 PM',
  },
  {
    id: '3',
    courtImage: images.scenic,
    availableSports: ['Baseball'],
    date: '14/jan/2025',
    title: 'Cricket Arena',
    address: '123 Cricket Lane, Sportstown',
    category: 'Upcoming',
    slotTiming: '4:00 PM - 5:00 PM',
  },
  {
    id: '4',
    courtImage: images.scenic,
    availableSports: ['Baseball'],
    date: '14/jan/2025',
    title: 'Cricket Arena',
    address: '123 Cricket Lane, Sportstown',
    category: 'Upcoming',
    slotTiming: '4:00 PM - 5:00 PM',
  },
  {
    id: '5',
    courtImage: images.scenic,
    availableSports: ['Baseball'],
    date: '14/jan/2025',
    title: 'Cricket Arena',
    address: '123 Cricket Lane, Sportstown',
    category: 'Upcoming',
    slotTiming: '4:00 PM - 5:00 PM',
  },
  {
    id: '6',
    courtImage: images.scenic,
    availableSports: ['Baseball'],
    date: '14/jan/2025',
    title: 'Cricket Arena',
    address: '123 Cricket Lane, Sportstown',
    category: 'Upcoming',
    slotTiming: '4:00 PM - 5:00 PM',
  },
  {
    id: '7',
    courtImage: images.scenic,
    availableSports: ['Baseball'],
    date: '14/jan/2025',
    title: 'Cricket Arena',
    address: '123 Cricket Lane, Sportstown',
    category: 'Upcoming',
    slotTiming: '4:00 PM - 5:00 PM',
  },
  // Add more dummy bookings if needed
];

const HEADER_HEIGHT = verticalScale(80); // height of the header   
const SCROLL_THRESHOLD = verticalScale(60);

const BookingCard = ({ item }) => {
  return (
    <View
      style={[
        bookingListStyles.bookingCardContainer,
        mainStyles.secondaryBackgroundColor,
        mainStyles.dropShadowEffect,
        { elevation: 4 },
        mainStyles.widthFull,
        mainStyles.flexContainer,
      ]}
    >
      <Image source={item.courtImage} style={bookingListStyles.courtImage} />
      <View style={bookingListStyles.bookingCardContent}>
        {/* Booking card category header */}
        <View
          style={[
            mainStyles.flexContainer,
            bookingListStyles.categoryHeaderContainer,
          ]}
        >
          <Image
            source={images.badminton}
            style={bookingListStyles.sportsCategoryImage}
          />
          <Text
            style={[
              mainStyles.successTextColor,
              mainStyles.fontNunitoSemibold,
              mainStyles.fontSize12,
              item.category === 'Completed' && mainStyles.warningTextColor,
              item.category === 'Cancelled' && mainStyles.errotTextColor,
            ]}
          >
            {item.category === 'Upcoming' ? 'Confirmed' : item.category}
          </Text>
        </View>
        {/* Box title, address and slot count */}
        <View style={bookingListStyles.titleAddressContainer}>
          <View style={bookingListStyles.titleAddressInnerContainer}>
            <Text
              style={[
                mainStyles.darkTextColor,
                mainStyles.fontInriaSansRegular,
                mainStyles.fontSize16,
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View
              style={[
                mainStyles.flexContainer,
                bookingListStyles.addressContainer,
              ]}
            >
              <Text
                style={[
                  mainStyles.lightTextColor,
                  mainStyles.fontNunitoSemibold,
                  mainStyles.fontSize12,
                  bookingListStyles.addressText,
                ]}
                numberOfLines={2}
              >
                {item.address}
              </Text>
              <View
                style={[
                  bookingListStyles.slotCountContainer,
                  mainStyles.successBackgroudColor,
                ]}
              >
                <Text style={bookingListStyles.slotCountText}>+2</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Date and slot time container */}
        <View
          style={[
            mainStyles.flexContainer,
            bookingListStyles.dateSlotContainer,
          ]}
        >
          <Text
            style={[
              mainStyles.lightTextColor,
              mainStyles.fontSize11,
              mainStyles.fontNunitoSemibold,
            ]}
          >
            {item.date}
          </Text>
          <Text
            style={[
              mainStyles.lightTextColor,
              mainStyles.fontSize11,
              mainStyles.fontNunitoSemibold,
            ]}
          >
            {item.slotTiming}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Bookings = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Upcoming');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Filter bookings based on selected category
  const filteredBookings = dummyBookings.filter(
    (booking) => booking.category === selectedCategory
  );

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT+verticalScale(15)],
    extrapolate: 'clamp',
  });

  // Animate the filter container similarly to search input.
  // For example, it can move up along with the search input.
  const filterTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT+verticalScale(15)],
    extrapolate: 'clamp',
  });

  const handleScrollToTop = () => {
    flatListRef.current &&
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  // Listen for scrollY changes to show/hide the "Move to Top" button
  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > SCROLL_THRESHOLD && !showScrollToTop) {
        setShowScrollToTop(true);
      } else if (value <= SCROLL_THRESHOLD && showScrollToTop) {
        setShowScrollToTop(false);
      }
    });
    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, showScrollToTop]);

  const renderBoxCard = ({ item }) => <BookingCard item={item} />;

  return (
    <View style={mainStyles.container}>
      <Animated.View
        style={[
          styles.animatedHeader,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <MainHeader headerType="booking" />
      </Animated.View>
      <View style={bookingListStyles.innerContainer}>
        <Animated.View
          style={[
            styles.animatedSearch,
            { transform: [{ translateY: searchTranslateY }] },
          ]}
        >
          <SearchInput
            value={search}
            onChangeText={setSearch}
            onSearchPress={undefined}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.animatedFilter,
            { transform: [{ translateY: filterTranslateY }] },
          ]}
        >
          <View style={bookingListStyles.filterContainer}>
            {bookingCategories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  bookingListStyles.filterButton,
                  mainStyles.disabledBackgroundColor,
                  selectedCategory === cat &&
                    mainStyles.primaryBackgroundColor,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    mainStyles.lightTextColor,
                    mainStyles.fontInriaSansRegular,
                    mainStyles.fontSize14,
                    selectedCategory === cat &&
                      bookingListStyles.filterTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        <Animated.FlatList
          ref={flatListRef}
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBoxCard}
          contentContainerStyle={{paddingTop:verticalScale(50),paddingHorizontal:verticalScale(5),paddingBottom:verticalScale(100)}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <NoDataContainer style={bookingListStyles.noDataContainer} />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      </View>
      {showScrollToTop && (
        <TouchableOpacity
          style={mainStyles.scrollToTopButton}
          activeOpacity={0.8}
          onPress={handleScrollToTop}
        >
          <Text
            style={[
              mainStyles.darkTextColor,
              mainStyles.fontNunitoBold,
              mainStyles.fontSize12,
            ]}
          >
            Move to Top
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
  },
  animatedSearch: {
    top: HEADER_HEIGHT-verticalScale(15),
    left: 0,
    right: 0,
    paddingHorizontal: scale(5),
    zIndex: 12,
  },
  animatedFilter: {
    top: HEADER_HEIGHT-verticalScale(15),
    left: 0,
    right: 0,
    zIndex: 12,
   paddingBottom:verticalScale(6)
  },
 
});
