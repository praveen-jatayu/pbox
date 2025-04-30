import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import MainHeader from '../../components/mainHeader';
import BoxCard from '../../components/boxCard';
import ImageSlider from './imageSlider';
import SearchInput from '../../components/searchInput';
import NoDataContainer from '../../components/noDataContainer';
import {getBoxDetail} from '../../services/boxService';
import {getSportDetail} from '../../services/sportService';
import homeStyles from '../../assets/styles/homeStyles';
import BoxCardSkeleton from '../../components/boxCardSkeleton';
import SportsCategorySkeleton from './sportsCategorySkeleton';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import {useNavigation, useRoute} from '@react-navigation/native';
import {requestLocationPermission} from '../../utils/permissionUtil';
import {COLORS} from '../../constants/color';
import ScreenWrapper from '../../components/screenWrapper';

const HEADER_HEIGHT = moderateVerticalScale(60); // height of the header
const MIN_HEADER_HEIGHT = moderateVerticalScale(150);

const Home = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [search, setSearch] = useState('');
  const [showAllSports, setShowAllSports] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boxData, setBoxData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [filteredBoxData, setFilteredBoxData] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSportsLoading, setIsSportsLoading] = useState<boolean>(true);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [location, setLocation] = useState([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(true);
  const renderBoxCard = ({item}) => (
    <BoxCard boxData={item} onAction={fetchBoxList} />
  );

  const sliderTranslateY = isSearchFocused
    ? -MIN_HEADER_HEIGHT * 1.5
    : scrollY.interpolate({
        inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
        outputRange: [0, -MIN_HEADER_HEIGHT * 1.3],
        extrapolate: 'clamp',
      });

  const sliderOpacity = isSearchFocused
    ? 0
    : scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT * 2.2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

  const sliderScale = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const instantTranslateY = isSearchFocused
    ? -MIN_HEADER_HEIGHT * 1.1
    : scrollY.interpolate({
        inputRange: [0, MIN_HEADER_HEIGHT * 2.3],
        outputRange: [0, -MIN_HEADER_HEIGHT * 1.1],
        extrapolate: 'clamp',
      });

  const filterTranslateY = isSearchFocused
    ? -MIN_HEADER_HEIGHT * 1.2
    : scrollY.interpolate({
        inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
        outputRange: [0, -MIN_HEADER_HEIGHT * 1.2],
        extrapolate: 'clamp',
      });

  const searchTranslateY = isSearchFocused
    ? -MIN_HEADER_HEIGHT * 1.2
    : scrollY.interpolate({
        inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
        outputRange: [0, -MIN_HEADER_HEIGHT * 1.2],
        extrapolate: 'clamp',
      });

  const sportsToShow = showAllSports ? sportData : sportData.slice(0, 4);

  const handleCategoryPress = item => {
    setIsLoading(true);
    setSelectedCategory(item.id === selectedCategory ? null : item.id);
    fetchBoxList(null, item.id === selectedCategory ? null : item.id);
  };

  const handleSearchChange = text => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredBoxData(boxData); // Show all data if search input is empty
    } else {
      const filteredData = boxData.filter(box =>
        box.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredBoxData(filteredData);
    }
  };

  const renderSportCategory = item => (
    <TouchableOpacity
      key={item.id.toString()} // Ensure unique keys
      style={[
        homeStyles.sportItem,
        selectedCategory !== null &&
          selectedCategory === item.id &&
          homeStyles.sportItemSelected,
      ]}
      onPress={() => handleCategoryPress(item)}>
      <View style={homeStyles.sportLogoBackground}>
        <Image source={{uri: item.image}} style={homeStyles.sportLogo} />
      </View>
      <Text
        style={[
          mainStyles.darkTextColor,
          mainStyles.fontInriaSansRegular,
          mainStyles.fontSize14,
          {textAlign: 'center'},
        ]}
        numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const fetchBoxList = async (boxData = null, sportId = null) => {
    const formData = new FormData();
    if (boxData !== null || sportId !== null) {
      if (boxData?.id) {
        formData.append('box_id', boxData.id);
      }
      if (sportId) {
        formData.append('sport_id', sportId); // Correctly appending sport_id
      }
    }
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    try {
      const response = await getBoxDetail(formData); // Pass the correct `formData`
      if (response) {
        setBoxData(response);
        setFilteredBoxData(response);
      } else {
        console.error('Error occurred:', response.error);
      }
    } catch (error) {
      console.error('Failed to fetch box data:', error);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };
  const getSportList = async (): Promise<void> => {
    try {
      const response = await getSportDetail();

      if (response) {
        console.log('sportData', response);
        setSportData(response);
      } else {
        console.log('error occured', response.message);
      }
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setIsSportsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetchingLocation) {
      setSelectedCategory(null);
      fetchBoxList(null, selectedCategory);
    }
  }, [isFetchingLocation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // Prevent default back action
      e.preventDefault();

      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
    });

    return unsubscribe; // Clean up the listener
  }, [navigation]);

  useEffect(() => {
    getSportList();
  }, []);

  useEffect(() => {
    setIsFetchingLocation(true);
    if (route?.params?.location) {
      setLocation(route.params.location);
      setIsFetchingLocation(false);
      setLatitude(route.params?.lat);
      setLongitude(route.params?.long);
    }
  }, [route.params?.location]);

  useEffect(() => {
    if (!route.params?.location) {
      fetchCurrentLocation();
    }
  }, []);
  // fetching current Location
  async function fetchCurrentLocation() {
    setIsFetchingLocation(true); // Start fetching

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location access is required!');
      return;
    }
    try {
      const locationData = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
      });

      const {latitude, longitude} = locationData;
      Geocoder.init('AIzaSyBuUVyHOxiZyUIvBIvsZg6O_ZiedhxW0FA');

      const geoData = await Geocoder.from(23.0638066, 70.1340917);
      if (geoData.results.length > 0) {
        const addressComponents = geoData.results[0].address_components;
        const area = addressComponents.find(component =>
          component.types.includes('sublocality'),
        )?.long_name;
        const city = addressComponents.find(component =>
          component.types.includes('locality'),
        )?.long_name;

        setLocation([area, city]); // Set area and city
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsFetchingLocation(false); // Finished fetching
    }
  }

  return (
    <ScreenWrapper
      safeTop={true}
      safeBottom={true}
      scrollable={true}
      padding={false}
      withHeader={false}>
      <MainHeader
        headerType="home"
        location={location}
        isFetchingLocation={isFetchingLocation}
      />

      <Animated.View
        style={[
          homeStyles.animatedSlider,
          {transform: [{scale: sliderScale}, {translateY: sliderTranslateY}]},
          {opacity: sliderOpacity},
        ]}>
        <ImageSlider onSlidePress={() => {}} />
      </Animated.View>

      <View style={{paddingHorizontal: scale(14), marginTop: verticalScale(4)}}>
        <Animated.View
          style={[
            homeStyles.animatedFilter,
            {transform: [{translateY: filterTranslateY}]},
          ]}>
          <View style={[mainStyles.flexContainer]}>
            <Text
              style={[
                mainStyles.darkTextColor,
                mainStyles.fontInriaSansRegular,
                mainStyles.fontSize18,
              ]}>
              Sports
            </Text>
            <TouchableOpacity onPress={() => setShowAllSports(!showAllSports)}>
              <Text
                style={[
                  mainStyles.fontInriaSansRegular,
                  mainStyles.fontSize14,
                  mainStyles.primaryTextColor,
                ]}>
                {showAllSports ? 'Show Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          {isSportsLoading ? (
            <View style={{flexDirection: 'row', width: '90%'}}>
              {[1, 2, 3, 4].map((_, index) => (
                <SportsCategorySkeleton key={index} />
              ))}
            </View>
          ) : (
            <View style={homeStyles.sportsContainer}>
              {sportsToShow.map(item => renderSportCategory(item))}
              {showAllSports &&
                sportData.length > sportsToShow.length &&
                sportData
                  .slice(sportsToShow.length)
                  .map(item => renderSportCategory(item))}
            </View>
          )}
        </Animated.View>
      </View>

      <Animated.View
        style={[
          homeStyles.animatedSearch,
          {transform: [{translateY: searchTranslateY}]},
        ]}>
        <SearchInput
          value={search}
          onChangeText={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </Animated.View>

      <Animated.View style={[{transform: [{translateY: instantTranslateY}]}]}>
        {isLoading && boxData.length === 0 ? (
          <Animated.FlatList
            data={[1, 1, 1, 1]}
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: verticalScale(200),
            }}
            renderItem={() => <BoxCardSkeleton />}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: true,
              },
            )}
            scrollEventThrottle={16}
          />
        ) : isLoading && boxData.length !== 0 ? (
          // Show Activity Indicator when switching categories and data exists
          <View style={homeStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <Animated.FlatList
            ref={flatListRef}
            data={filteredBoxData}
            renderItem={renderBoxCard}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              homeStyles.flatListContainer,
              filteredBoxData.length <= 2 &&
                boxData.length <= 2 && {paddingBottom: verticalScale(300)},
            ]}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: true,
              },
            )}
            scrollEventThrottle={16}
            ListEmptyComponent={
              <NoDataContainer
                style={undefined}
                noDataText={'No boxes available!!'}
              />
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  fetchBoxList();
                  // getSportList();
                }}
              />
            }
          />
        )}
      </Animated.View>

      {/* error here */}
      {/* {isFetchingLocation && (
   
   <Modal transparent={true} animationType="fade" visible={isFetchingLocation} style={{ justifyContent: 'flex-end',
    margin: 0,}}
    statusBarTranslucent={true}>
     <View style={{
      flex:1,
       justifyContent: 'center', 
       alignItems: 'center', 
       margin:0,
       backgroundColor: 'rgba(0,0,0,0.5)' // Semi-transparent overlay
     }}>
       <View style={{
          padding:16,
         backgroundColor: 'white', 
         borderRadius: 10,
         alignItems: 'center'
       }}>
         <ActivityIndicator size="large" color={COLORS.primary} />
         <Text style={{ marginTop: 10 }}>Fetching Location...</Text>
       </View>
     </View>
   </Modal>
   
 )} */}
    </ScreenWrapper>
  );
};

export default Home;
