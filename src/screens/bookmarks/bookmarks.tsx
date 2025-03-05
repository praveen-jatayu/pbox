import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CustomTopHeader from '../../components/mainHeader';
import mainStyles from '../../assets/styles/mainStyles';
import SearchInput from '../../components/searchInput';
import BoxCard from '../../components/boxCard';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { images } from '../../constants/image';
import MainHeader from '../../components/mainHeader';

const bookmarkedBoxData = [
  {
    id: '1',
    title: 'Cricket Arena',
    rating: 4.5,
    address: '123 Cricket Lane, Sportstown',
    startingPrice: '₹500',
    offers: 'Upto 20% Off',
    images: [
      images.scenic,
      images.scenic,
      images.scenic,
      images.scenic,
    ],
  },
  {
    id: '2',
    title: 'Sports Hub',
    rating: 4.2,
    address: '456 Sporty Ave, Game City',
    startingPrice: '₹450',
    offers: 'Upto 15% Off',
    images: [
      images.scenic,
      images.scenic,
      images.scenic,
      images.scenic,
    ],
  },
  {
    id: '3',
    title: 'Sports Hub',
    rating: 4.2,
    address: '456 Sporty Ave, Game City',
    startingPrice: '₹450',
    offers: 'Upto 15% Off',
    images: [
      images.scenic,
      images.scenic,
      images.scenic,
      images.scenic,
    ],
  },
  // Add more items as needed...
];
const HEADER_HEIGHT = verticalScale(80); // height of the header
const SEARCH_HEIGHT = verticalScale(50);  
const SCROLL_THRESHOLD = verticalScale(150);
const Bookmarks = () => {
  const [search, setSearch] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
   // Header moves up from 0 to -HEADER_HEIGHT
   const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  // Search bar moves up further so that it sticks to top.
  // When scrollY reaches HEADER_HEIGHT, we want the search to be at y = 0.
  // Initially, search is below header (i.e. at HEADER_HEIGHT)
  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const renderBoxCard = ({ item }) => (
    <BoxCard data={item} isBookmarked="true" />
  );

   // Listen to scrollY changes and update "showScrollToTop"
   useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > SCROLL_THRESHOLD && !showScrollToTop) {
        setShowScrollToTop(true);
      } else if (value <= SCROLL_THRESHOLD && showScrollToTop) {
        setShowScrollToTop(false);
      }
    });
    return () => scrollY.removeListener(listenerId);
  }, [scrollY, showScrollToTop]);


  const handleScrollToTop = () => {
    flatListRef.current && flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={mainStyles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.animatedHeader,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <MainHeader headerType="bookmark" />
      </Animated.View>

      {/* Animated SearchInput */}
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

      <Animated.FlatList
       ref={flatListRef}
        data={bookmarkedBoxData}
        renderItem={renderBoxCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
    
      />
       {/* Move to Top Button */}
       {showScrollToTop && (
        <TouchableOpacity
          style={mainStyles.scrollToTopButton}
          activeOpacity={0.8}
          onPress={handleScrollToTop}
        >
          <Text style={[mainStyles.darkTextColor,mainStyles.fontNunitoBold,mainStyles.fontSize12]}>Move to Top</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Bookmarks;

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
    // position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(10),
    paddingTop:verticalScale(7),
    zIndex: 12,
  },
  listContainer: {
    paddingTop: HEADER_HEIGHT, // Extra top padding to account for header & search bar
    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(70),
  },
  

});
