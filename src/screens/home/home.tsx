import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

import BottomModal from '../../components/bottomModal';
import mainStyles from '../../assets/styles/mainStyles';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/color';
import { images } from '../../constants/image';
import BoxCard from '../../components/boxCard';
import SearchInput from '../../components/searchInput';
import ImageSlider from './imageSlider';
import MainHeader from '../../components/mainHeader';

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
    images: [images.scenic, images.scenic, images.scenic, images.scenic],
  },
  {
    id: '2',
    title: 'Sports Hub',
    rating: 4.2,
    address: '456 Sporty Ave, Game City',
    startingPrice: '₹450',
    offers: 'Upto 15% Off',
    images: [images.scenic, images.scenic, images.scenic, images.scenic],
  },
  {
    id: '3',
    title: 'Sports Hub',
    rating: 4.2,
    address: '456 Sporty Ave, Game City',
    startingPrice: '₹450',
    offers: 'Upto 15% Off',
    images: [images.scenic, images.scenic, images.scenic, images.scenic],
  },
  {
    id: '4',
    title: 'Sports Hub',
    rating: 4.2,
    address: '456 Sporty Ave, Game City',
    startingPrice: '₹450',
    offers: 'Upto 15% Off',
    images: [images.scenic, images.scenic, images.scenic, images.scenic],
  },
];
const HEADER_HEIGHT = moderateVerticalScale(80); // height of the header   
const SCROLL_THRESHOLD = verticalScale(60);
const Home = () => {
  const [search, setSearch] = useState('');
  const [showAllSports, setShowAllSports] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isNotificationPermissionModalVisible, setIsNotificationPermissionModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);


  const toggleNotificationPermissionModal = () => {
    setIsNotificationPermissionModalVisible(!isNotificationPermissionModalVisible);
  };

  const handleSearchChange = text => {
    setSearch(text);
  };

  const sportsToShow = showAllSports ? sportsData : sportsData.slice(0, 4);

  const handleCategoryPress = item => {
    setSelectedCategory(item.id === selectedCategory ? null : item.id);
  };

  const renderSportCategory = item => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.sportItem,
        selectedCategory === item.id && [styles.sportItemSelected, mainStyles.primaryBorderColor],
      ]}
      onPress={() => handleCategoryPress(item)}>
      <View style={styles.sportLogoBackground}>
        <Image source={item.logo} style={styles.sportLogo} />
      </View>
      <Text style={[mainStyles.darkTextColor, mainStyles.fontInriaSansRegular, mainStyles.fontSize14, { textAlign: 'center' }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderBoxCard = ({ item }) => <BoxCard data={item} />;


  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const sliderTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  // Interpolating scrollY to control the slider's scale and opacity
  const sliderScale = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const sliderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT-moderateVerticalScale(150,0.4)],
      extrapolate: 'clamp',
    });
  
    // Animate the filter container similarly to search input.
    // For example, it can move up along with the search input.
    const filterTranslateY = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT-moderateVerticalScale(145,0.8)],
      extrapolate: 'clamp',
    });

  const handleSearchPress = () => {
    console.log('Search query submitted: ', search);
  };

  return (
    <View style={[mainStyles.container]}>
        <Animated.View
              style={[
                styles.animatedHeader,
                { transform: [{ translateY: headerTranslateY }] },
              ]}
            >
      <MainHeader headerType="home" />
      </Animated.View>

      {/* Animated Slider */}
      <Animated.View
        style={[
          styles.animatedSlider,
        {  transform: [{ scale: sliderScale},{ translateY: sliderTranslateY } ]},
         { opacity: sliderOpacity,}
        ]}>
        <ImageSlider onSlidePress={() => {}} />
      </Animated.View>

      <View style={{ paddingHorizontal: scale(14),marginTop:verticalScale(4) }}>
        <Animated.View   style={[
            styles.animatedFilter,
            { transform: [{ translateY: filterTranslateY }] },
          ]}>
        <View style={[mainStyles.flexContainer]}>
          <Text style={[mainStyles.darkTextColor, mainStyles.fontInriaSansRegular, mainStyles.fontSize18]}>Sports</Text>
          <TouchableOpacity onPress={() => setShowAllSports(!showAllSports)}>
            <Text style={[mainStyles.fontInriaSansRegular, mainStyles.fontSize14, mainStyles.primaryTextColor]}>
              {showAllSports ? 'Show Less' : 'See All'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sportsContainer}>
          {sportsToShow.map(item => renderSportCategory(item))}
          {showAllSports &&
            sportsData.length > sportsToShow.length &&
            sportsData.slice(sportsToShow.length).map(item => renderSportCategory(item))}
        </View>
        </Animated.View>
      </View>

       
   
        <Animated.View  style={[
            styles.animatedSearch,
            { transform: [{ translateY: searchTranslateY }] },
          ]}>
      <SearchInput value={search} onChangeText={handleSearchChange} onSearchPress={handleSearchPress} />
      
   
        {/* FlatList with scroll animation */}
        <Animated.FlatList
         ref={flatListRef}
          data={boxCourtData}
          renderItem={renderBoxCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
        />
        </Animated.View>
     

      <BottomModal isModalVisible={isNotificationPermissionModalVisible} toggleModal={toggleNotificationPermissionModal} type="notification" />
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
    paddingHorizontal:scale(10),
  },
  flatListContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(200),
  },
 
    animatedHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      zIndex: 10,
    },
  animatedFilter: {
      top: HEADER_HEIGHT-moderateVerticalScale(90),
      left: 0,
      right: 0,
      paddingHorizontal: scale(5),
      zIndex: 12,
    },
    animatedSlider: {
      top: HEADER_HEIGHT-moderateVerticalScale(90),
      left: 0,
      right: 0,
      paddingHorizontal: scale(5),
      marginTop:verticalScale(70),
      zIndex: 12,
    },
     animatedSearch: {
        top: HEADER_HEIGHT-moderateVerticalScale(80),
        left: 0,
        right: 0,
        paddingHorizontal: scale(5),
        zIndex: 12,
      },
});

export default Home;
