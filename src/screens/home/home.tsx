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

// const sportsData = [
//   { id: '1', name: 'Cricket', logo: images.football },
//   { id: '2', name: 'Football', logo: images.football },
//   { id: '3', name: 'Basketball', logo: images.baseball },
//   { id: '4', name: 'Tennis', logo: images.tennis },
//   { id: '5', name: 'Baseball', logo: images.baseball },
//   { id: '6', name: 'Badminton', logo: images.badminton },
// ];


// const boxData = [
//   {
//     id: '1',
//     title: 'Cricket Arena',
//     rating: 4.5,
//     address: '123 Cricket Lane, Sportstown',
//     startingPrice: '₹500',
//     offers: 'Upto 20% Off',
//     images: [
//       images.scenic,
//       images.scenic,
//       images.scenic,
//       images.scenic,
//     ],
//   },
//   {
//     id: '2',
//     title: 'Sports Hub',
//     rating: 4.2,
//     address: '456 Sporty Ave, Game City',
//     startingPrice: '₹450',
//     offers: 'Upto 15% Off',
//     images: [
//       images.scenic,
//       images.scenic,
//       images.scenic,
//       images.scenic,
//     ],
//   },
//   {
//     id: '3',
//     title: 'Sports Hub',
//     rating: 4.2,
//     address: '456 Sporty Ave, Game City',
//     startingPrice: '₹450',
//     offers: 'Upto 15% Off',
//     images: [
//       images.scenic,
//       images.scenic,
//       images.scenic,
//       images.scenic,
//     ],
//   },
//   // Add more items as needed...
// ];

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [search, setSearch] = useState('');
  const [showAllSports, setShowAllSports] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boxData,setBoxData]=useState([])
  const [sportData,setSportData]=useState([])
  const [filteredBoxData,setFilteredBoxData]=useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const renderBoxCard = ({ item }) => <BoxCard boxData={item} onAction={getBoxList}/>;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
    outputRange: [0, -MIN_HEADER_HEIGHT * 1.3],
    extrapolate: 'clamp',
  });

  const filterTranslateY = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
    outputRange: [0, -MIN_HEADER_HEIGHT * 1.5],
    extrapolate: 'clamp',
  });

  const sliderTranslateY = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
    outputRange: [0, -MIN_HEADER_HEIGHT * 1.3],
    extrapolate: 'clamp',
  });

  // Interpolating scrollY to control the slider's scale and opacity
  const sliderScale = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 4],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const sliderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT * 2.2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const instantTranslateY = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
    outputRange: [0, -MIN_HEADER_HEIGHT * 1.4],
    extrapolate: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, MIN_HEADER_HEIGHT * 2.2],
    outputRange: [0, -MIN_HEADER_HEIGHT * 1.5],
    extrapolate: 'clamp',
  });

  const sportsToShow = showAllSports ? sportData: sportData.slice(0,4);

  const handleCategoryPress = item => {
    setSelectedCategory(item.id === selectedCategory ? null : item.id);
   const filteredData = filteredBoxData.filter(box =>
      box.get_selected_available_sport.some(sport =>
          sport.get_single_sports.id === selectedCategory
      )
  );
  setFilteredBoxData(filteredData)
  };

  const handleSearchChange = text => {
    setSearch(text);
  };

  const handleSearchPress = () => {
    console.log('Search query submitted: ', search);
  };

  const renderSportCategory = item => (
    <TouchableOpacity
      key={item.id.toString()} // Ensure unique keys
      style={[
        homeStyles.sportItem,
        selectedCategory === item.id && [homeStyles.sportItemSelected],
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={homeStyles.sportLogoBackground}>
        <Image source={{ uri: item.icon }} style={homeStyles.sportLogo} />
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

  const getBoxList = async (boxData = null) => {
    setRefreshing(true);
    setIsLoading(true)
    if(boxData!==null){
    const formData = new FormData();

    // Conditionally add 'box_id' only when it's provided
    if (boxData?.id) {
        formData.append('box_id', boxData.id);
    }
    }
    try {
        const response = await getBoxDetail(boxData!==null?formData:{});
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
    getBoxList()
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
        <SearchInput value={search} onChangeText={handleSearchChange} onSearchPress={handleSearchPress} />
      </Animated.View>

      <Animated.View style={[{ transform: [{ translateY: instantTranslateY }] }]}>
      {isLoading ? (
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
            <NoDataContainer style={undefined} />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                getBoxList();
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