import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import HomeCustomHeader from './components/homeCustomHeader';
import BottomModal from '../../components/bottomModal';
import ImageSlider from './components/imageSlider';
import mainStyles from '../../assets/styles/mainStyles';
import {moderateScale, moderateVerticalScale, scale, verticalScale} from 'react-native-size-matters';
import SearchBar from '../../components/searchBar';
import {FONTS} from '../../constants/fontConstant';
import {COLORS} from '../../constants/colorConstant';
import {images} from '../../constants/image';
import BoxCard from '../../components/boxCard';

// Sample sports data
const sportsData = [
  { id: '1', name: 'Cricket', logo: images.football },
  { id: '2', name: 'Football', logo: images.football },
  { id: '3', name: 'Basketball', logo: images.baseball },
  { id: '4', name: 'Tennis', logo: images.tennis },
  { id: '5', name: 'Baseball', logo: images.baseball },
  { id: '6', name: 'Badminton', logo: images.badminton },
  // Add more items as needed...
];


const boxCourtData = [
  {
    id: '1',
    title: 'Cricket Arena',
    rating: 4.5,
    address: '123 Cricket Lane, Sportstown',
    startingPrice: '₹500',
    offers: '20% OFF',
    images: [
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
    offers: '15% OFF',
    images: [
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

  const handleSearchChange = text => {
    setSearch(text);
  };

  const renderBoxCard = ({ item }) => (
    <BoxCard
      data={item}
    />
  );

  
  const sportsToShow = showAllSports ? sportsData : sportsData.slice(0, 4);

  const handleCategoryPress = item => {
    setSelectedCategory(item.id === selectedCategory ? null : item.id);
    // Here you can also call a filtering function based on the selected category
  };

  const renderSportCategory = item => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.sportItem,
        selectedCategory === item.id && styles.sportItemSelected,
      ]}
      onPress={() => handleCategoryPress(item)}>
      <View style={styles.sportLogoBackground}>
        <Image source={item.logo} style={styles.sportLogo} />
      </View>
      <Text style={styles.sportName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={mainStyles.container}>
      {/* <HomeCustomHeader />
      <ImageSlider onSlidePress={undefined} /> */}
      <View style={{ paddingHorizontal: scale(14), marginTop: verticalScale(3),flex:1 }}>
      <View style={styles.headerRow}>
          <Text style={styles.headerText}>Sports</Text>
          <TouchableOpacity onPress={() => setShowAllSports(!showAllSports)}>
            <Text style={styles.seeAllText}>
              {showAllSports ? 'Show Less' : 'See All'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Category Filter */}
        <View style={styles.sportsContainer}>
          {sportsToShow.map(item => renderSportCategory(item))}
          {/* If expanded and there are more items than the collapsed count, show remaining in a new row */}
          {showAllSports &&
            sportsData.length > sportsToShow.length &&
            sportsData.slice(sportsToShow.length).map(item => renderSportCategory(item))}
        </View>
        <View style={{ marginTop: verticalScale(5),width:'100%',paddingHorizontal:-30 }}>
          <SearchBar value={search} onChangeText={handleSearchChange} />
         
          <FlatList
        data={boxCourtData}
        renderItem={renderBoxCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
      
      </View>
      </View>
      <BottomModal />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: FONTS.inriaSansRegular,
    color: COLORS.darkText,
    fontSize: scale(19),
  },
  seeAllText: {
    fontFamily: FONTS.inriaSansRegular,
    color: COLORS.primary,
    fontSize: scale(15),
  },
  sportsContainer: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    width:'100%',
    flexWrap: 'wrap', // Allows items to wrap into a new row when needed
  },
  sportItem: {
    
    alignItems: 'center',
    marginRight: scale(17),
    marginLeft:scale(10),
    marginBottom:verticalScale(10)
    
  },
  sportItemSelected: {
    borderColor: COLORS.primary,
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
  sportName: {
    fontFamily: FONTS.inriaSansRegular,
    fontSize: scale(14),
    color: COLORS.darkText,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(200),
    
    
  },
});

export default Home;


