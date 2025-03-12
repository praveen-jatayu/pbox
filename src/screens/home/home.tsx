import { View, Text, Animated, StyleSheet, TouchableOpacity, Image, Easing, RefreshControl, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import MainHeader from '../../components/mainHeader'
import BoxCard from '../../components/boxCard'
import ImageSlider from './imageSlider'
import SearchInput from '../../components/searchInput'
import NoDataContainer from '../../components/noDataContainer'
import { getBoxDetail } from '../../services/boxService'
import { getSportDetail } from '../../services/sportService'
import homeStyles from '../../assets/styles/homeStyles'
import BoxCardSkeleton from '../../components/boxCardSkeleton'
import SportsCategorySkeleton from './sportsCategorySkeleton'

const HEADER_HEIGHT = moderateVerticalScale(80); // height of the header
const MIN_HEADER_HEIGHT = moderateVerticalScale(150); 


const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [search, setSearch] = useState('');
  const [showAllSports, setShowAllSports] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boxData,setBoxData]=useState([])
  const [sportData,setSportData]=useState([])
  const [filteredBoxData,setFilteredBoxData]=useState([])
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const renderBoxCard = ({ item }) => <BoxCard boxData={item} onAction={fetchBoxList}/>;

  const headerTranslateY = isSearchFocused
  ? -MIN_HEADER_HEIGHT * 1.2
  : scrollY.interpolate({
      inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
      outputRange: [0, -MIN_HEADER_HEIGHT * 1.3],
      extrapolate: 'clamp',
    });

const sliderTranslateY = isSearchFocused
  ? -MIN_HEADER_HEIGHT * 1.5
  : scrollY.interpolate({
      inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
      outputRange: [0, -MIN_HEADER_HEIGHT * 1.3],
      extrapolate: 'clamp',
    });

const sliderOpacity = isSearchFocused ? 0 : scrollY.interpolate({
  inputRange: [0, HEADER_HEIGHT * 2.2],
  outputRange: [1, 0],
  extrapolate: 'clamp',
});

  // const filterTranslateY = scrollY.interpolate({
  //   inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
  //   outputRange: [0, -MIN_HEADER_HEIGHT * 1.5],
  //   extrapolate: 'clamp',
  // });

  // const sliderTranslateY = scrollY.interpolate({
  //   inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
  //   outputRange: [0, -MIN_HEADER_HEIGHT * 1.3],
  //   extrapolate: 'clamp',
  // });

  // Interpolating scrollY to control the slider's scale and opacity
  const sliderScale = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 4],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // const sliderOpacity = scrollY.interpolate({
  //   inputRange: [0, HEADER_HEIGHT * 2.2],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp',
  // });

  const instantTranslateY =  isSearchFocused
  ? -MIN_HEADER_HEIGHT * 1.5
  :scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
    outputRange: [0, -MIN_HEADER_HEIGHT * 1.4],
    extrapolate: 'clamp',
  });

  const filterTranslateY = isSearchFocused
  ? -MIN_HEADER_HEIGHT * 1.5
  : scrollY.interpolate({
      inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
      outputRange: [0, -MIN_HEADER_HEIGHT * 1.5],
      extrapolate: 'clamp',
    });

const searchTranslateY = isSearchFocused
  ? -MIN_HEADER_HEIGHT * 1.5
  : scrollY.interpolate({
      inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
      outputRange: [0, -MIN_HEADER_HEIGHT * 1.5],
      extrapolate: 'clamp',
    });

  const sportsToShow = showAllSports ? sportData: sportData.slice(0,4);

  const handleCategoryPress = item => {
    console.log('selected sport ',item)
    setSelectedCategory(item.id === selectedCategory ? null : item.id);
    fetchBoxList(item.id)
  
  };

  const handleSearchChange = text => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredBoxData(boxData); // Show all data if search input is empty
    } else {
      const filteredData = boxData.filter(box =>
        box.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBoxData(filteredData);
    }
  
  };


  const renderSportCategory = item => (
    <TouchableOpacity
      key={item.id.toString()} // Ensure unique keys
      style={[
        homeStyles.sportItem,
        selectedCategory !== null && selectedCategory === item.id && homeStyles.sportItemSelected,
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={homeStyles.sportLogoBackground}>
        <Image source={{ uri: item.image }} style={homeStyles.sportLogo} />
      </View>
      <Text 
        style={[
          mainStyles.darkTextColor,
          mainStyles.fontInriaSansRegular,
          mainStyles.fontSize14,
          { textAlign: 'center' }
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
);

  const fetchBoxList = async (boxData = null,sportId=null) => {
    console.log('sportId',sportId)
  
    const formData = new FormData();
    if(boxData!==null || sportId!==null){
    
    // Conditionally add 'box_id' only when it's provided
    if (boxData?.id) {
        formData.append('box_id', boxData.id);
    }
    if(sportId){
    formData.append('sport_id',sportId)
    }
  }
  

    try {
        const response = await getBoxDetail(boxData!==null||sportId!==null?formData:{});
        if (response) {
            
            setBoxData(response);
            setFilteredBoxData(response)
        } else {
            console.error('Error occurred:', response.error);
        }
    } catch (error) {
        console.error('Failed to fetch box data:', error);
    } finally {
        setRefreshing(false);
        setIsLoading(false)
    }
};
  const getSportList = async () => {
   setIsLoading(true)
    try {
     
      const response = await  getSportDetail()
      console.log('sports',response)
  
      if (response) {
        console.log('sportData',response)
       setSportData(response)
      } else {
       console.log('error occured',response.error)
      }
  
     
    } catch (error) {
      
      console.error('Login Error:', error);
     
    }
    finally{
      setRefreshing(false)
      setIsLoading(false)
    }
  };


  useEffect(()=>{
    setSelectedCategory(null)
    fetchBoxList()
    getSportList()
  },[])

  return (
    <View style={mainStyles.container}>
      <Animated.View
        style={[
          homeStyles.animatedHeader,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <MainHeader headerType="home" />
      </Animated.View>

      <Animated.View
        style={[
          homeStyles.animatedSlider,
          { transform: [{ scale: sliderScale }, { translateY: sliderTranslateY }] },
          { opacity: sliderOpacity, }
        ]}>
        <ImageSlider onSlidePress={() => { }} />
      </Animated.View>

      <View style={{ paddingHorizontal: scale(14), marginTop: verticalScale(4) }}>
        <Animated.View style={[
          homeStyles.animatedFilter,
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
          {isLoading ? (
  <View style={{ flexDirection: 'row', width:'90%' }}> 
    {[1, 2, 3, 4].map((_, index) => (
      <SportsCategorySkeleton key={index} />
    ))}
  </View>
) : (

          <View style={homeStyles.sportsContainer}>
            {sportsToShow.map(item => renderSportCategory(item))}
            {showAllSports &&
              sportData.length > sportsToShow.length &&
              sportData.slice(sportsToShow.length).map(item => renderSportCategory(item))}
          </View>
  )}
        </Animated.View>
      </View>

      <Animated.View style={[
        homeStyles.animatedSearch,
        { transform: [{ translateY: searchTranslateY }] },
      ]}>
        <SearchInput value={search} onChangeText={handleSearchChange}  onFocus={() => setIsSearchFocused(true)}
    onBlur={() => setIsSearchFocused(false)} />
      </Animated.View>

      <Animated.View style={[{ transform: [{ translateY: instantTranslateY }] }]}>
      {(isLoading || boxData.length===0) ? (
        <Animated.FlatList
          data={[1, 1,1,1]}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:verticalScale(200)}}
          renderItem={() => <BoxCardSkeleton />}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
        
        />
      ):(
        <Animated.FlatList  
          ref={flatListRef}
          data={filteredBoxData}
          renderItem={renderBoxCard}
          keyExtractor={item => item.id}
          contentContainerStyle={homeStyles.flatListContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <NoDataContainer style={undefined} noDataText='No box  available!!' />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                fetchBoxList();
                getSportList();
              }}
            />
          }
        />
      )}
      </Animated.View>
    </View>
  )
}



export default Home;