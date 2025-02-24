import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';

import BottomModal from '../../components/bottomModal';

import mainStyles from '../../assets/styles/mainStyles';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/color';
import { images } from '../../constants/image';
import BoxCard from '../../components/boxCard';
import SearchInput from '../../components/searchInput';
import ImageSlider from './imageSlider';
import CustomTopHeader from '../../components/mainHeader';
import MainHeader from '../../components/mainHeader';

// Sample sports data
const sportsData = [
  { id: '1', name: 'Cricket', logo: images.football },
  { id: '2', name: 'Football', logo: images.football },
  { id: '3', name: 'Basketball', logo: images.baseball },
  { id: '4', name: 'Tennis', logo: images.tennis },
  { id: '5', name: 'Baseball', logo: images.baseball },
  { id: '6', name: 'Badminton', logo: images.badminton },
];

const boxCourtData = [
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
  // Add more items as needed...
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [showAllSports, setShowAllSports] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = verticalScale(200); // Adjust based on your slider height

  const handleSearchChange = text => {
    setSearch(text);
  };

  const sportsToShow = showAllSports ? sportsData : sportsData.slice(0, 4);

  const handleCategoryPress = item => {
    setSelectedCategory(item.id === selectedCategory ? null : item.id);
    // Here you can also filter boxCourtData based on the category
  };

  const renderSportCategory = item => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.sportItem,
        selectedCategory === item.id && [styles.sportItemSelected,mainStyles.primaryBorderColor],
      ]}
      onPress={() => handleCategoryPress(item)}>
      <View style={styles.sportLogoBackground}>
        <Image source={item.logo} style={styles.sportLogo} />
      </View>
      <Text style={[mainStyles.darkTextColor,mainStyles.fontInriaSansRegular,mainStyles.fontSize14,{textAlign:'center'}]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBoxCard = ({ item }) => (
    <BoxCard data={item} />
  );

  // Interpolate scrollY to control the slider's scale and opacity
  const sliderScale = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const sliderOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.8],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleSearchPress = () => {
    // For example, submit the search query
    console.log('Search query submitted: ', search);
  };

  return (
    <View style={mainStyles.container}>
      {/* home top header */}
     <MainHeader headerType='home'/>
      <Animated.ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Animated Slider */}
        <Animated.View
          style={{
            transform: [{ scale: sliderScale }],
            opacity: sliderOpacity,
          }}
        >
          <ImageSlider onSlidePress={() => {}} />
        </Animated.View>

        <View style={{ paddingHorizontal: scale(14), marginTop: verticalScale(3) }}>
          <View style={[mainStyles.flexContainer]}>
            <Text style={[mainStyles.darkTextColor,mainStyles.fontInriaSansRegular,mainStyles.fontSize18]}>Sports</Text>
            <TouchableOpacity onPress={() => setShowAllSports(!showAllSports)}>
              <Text style={[mainStyles.fontInriaSansRegular,mainStyles.fontSize14,mainStyles.primaryTextColor]}>
                {showAllSports ? 'Show Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Category Filter */}
          <View style={styles.sportsContainer}>
            {sportsToShow.map(item => renderSportCategory(item))}
            {showAllSports &&
              sportsData.length > sportsToShow.length &&
              sportsData.slice(sportsToShow.length).map(item => renderSportCategory(item))}
          </View>
          <View style={styles.searchAndListContainer}>
           <SearchInput value={search} onChangeText={handleSearchChange} onSearchPress={handleSearchPress} />
            <FlatList
              data={boxCourtData}
              renderItem={renderBoxCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Animated.ScrollView>
      <BottomModal />
    </View>
  );
};

const styles = StyleSheet.create({
  sportsContainer: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportItem: {
    alignItems: 'center',
    marginRight: scale(17),
    marginLeft: scale(10),
    marginBottom: verticalScale(10),
  },
  sportItemSelected: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    padding: scale(4),
  },
  sportLogoBackground: {
    width: moderateScale(40),
    height: moderateVerticalScale(40),
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.itemBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(4),
  },
  sportLogo: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  searchAndListContainer: {
    marginTop: verticalScale(5),
    width: '100%',
  },
  flatListContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(200),
  },
});

export default Home;
