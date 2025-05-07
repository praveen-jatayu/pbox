import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
  FlatList,
} from 'react-native';
import mainStyles from '../../assets/styles/mainStyles';
import SearchInput from '../../components/searchInput';
import BoxCard from '../../components/boxCard';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MainHeader from '../../components/mainHeader';
import {getBoxDetail} from '../../services/boxService';
import BoxCardSkeleton from '../../components/boxCardSkeleton';
import NoDataContainer from '../../components/noDataContainer';
import {useIsFocused} from '@react-navigation/native';
import ScreenWrapper from '../../components/screenWrapper';
import {Box} from '../types/box';

const HEADER_HEIGHT = verticalScale(60); // height of the header
const SCROLL_THRESHOLD = verticalScale(150);
const Bookmarks = () => {
  const [search, setSearch] = useState<string>('');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [bookmarkedBoxData, setBookmarkedBoxData] = useState<Box[]>([]);
  const [filteredBookmarkedData, setFilteredBookmarkedData] = useState<Box[]>(
    [],
  );
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<Box>>(null);
  const skeletonListRef = useRef(null);
  const isFocused = useIsFocused();
  // Header moves up from 0 to -HEADER_HEIGHT
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredBookmarkedData(bookmarkedBoxData); // Show all data if search input is empty
    } else {
      const filteredData = bookmarkedBoxData.filter(box =>
        box?.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredBookmarkedData(filteredData);
    }
  };

  const renderBoxCard = ({item}: {item: Box}) => (
    <BoxCard boxData={item} onAction={fetchBookMarkedBoxList} />
  );

  // Listen to scrollY changes and update "showScrollToTop"
  useEffect(() => {
    const listenerId = scrollY.addListener(({value}) => {
      if (value > SCROLL_THRESHOLD && !showScrollToTop) {
        setShowScrollToTop(true);
      } else if (value <= SCROLL_THRESHOLD && showScrollToTop) {
        setShowScrollToTop(false);
      }
    });
    return () => scrollY.removeListener(listenerId);
  }, [scrollY, showScrollToTop]);

  const handleScrollToTop = () => {
    flatListRef.current &&
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
  };

  const fetchBookMarkedBoxList = async (boxData: Box | null = null) => {
    const formData = new FormData();
    if (boxData !== null && boxData?.id) {
      // Conditionally add 'box_id' only when it's provided
      if (boxData?.id) {
        formData.append('box_id', boxData.id);
      }
    }
    try {
      const response: Box[] = await getBoxDetail(
        boxData !== null ? formData : {},
      );
      if (response) {
        const bookmarketBoxes = response.filter(
          box => box?.get_selected_user_book_mark?.length > 0,
        );
        setBookmarkedBoxData(bookmarketBoxes);
        setFilteredBookmarkedData(bookmarketBoxes);
      }
    } catch (error) {
      console.error('Failed to fetch box data:', error);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookMarkedBoxList();
    setSearch('');
  }, [isFocused]);
  return (
    <ScreenWrapper
      safeTop={true}
      safeBottom={true}
      scrollable={false}
      padding={false}
      withHeader={false}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.animatedHeader,
          {transform: [{translateY: headerTranslateY}]},
        ]}>
        <MainHeader headerType="bookmark" />
      </Animated.View>

      {/* Animated SearchInput */}
      <Animated.View
        style={[
          styles.animatedSearch,
          {transform: [{translateY: searchTranslateY}]},
        ]}>
        <SearchInput
          value={search}
          onChangeText={handleSearchChange}
          onFocus={undefined}
          onBlur={undefined}
        />
      </Animated.View>

      {isLoading ? (
        <Animated.FlatList<number>
          data={[1, 1, 1, 1]}
          ref={skeletonListRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            {paddingHorizontal: scale(0)},
          ]}
          renderItem={() => <BoxCardSkeleton />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={16}
        />
      ) : (
        <Animated.FlatList
          ref={flatListRef}
          data={filteredBookmarkedData}
          renderItem={renderBoxCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[styles.listContainer, {flexGrow: 1}]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <NoDataContainer
              style={undefined}
              noDataText="No bookmarks available!!"
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                fetchBookMarkedBoxList();
              }}
            />
          }
        />
      )}
      {/* Move to Top Button */}
      {showScrollToTop && (
        <TouchableOpacity
          style={mainStyles.scrollToTopButton}
          activeOpacity={0.8}
          onPress={handleScrollToTop}>
          <Text
            style={[
              mainStyles.darkTextColor,
              mainStyles.fontNunitoBold,
              mainStyles.fontSize12,
            ]}>
            Move to Top
          </Text>
        </TouchableOpacity>
      )}
    </ScreenWrapper>
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
    paddingTop: verticalScale(7),
    zIndex: 12,
  },
  listContainer: {
    paddingTop: HEADER_HEIGHT, // Extra top padding to account for header & search bar
    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(70),
  },
});
