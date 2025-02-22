import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import mainStyles from '../../assets/styles/mainStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import boxCardStyles from '../../assets/styles/boxCardStyles';
import {icons} from '../../constants/Icon';
import {images} from '../../constants/image';
import PrimaryButton from '../../components/primaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const sliderHeight = screenHeight / 3;

const availableSportsData = [
  {id: '1', name: 'Cricket', logo: images.football},
  {id: '2', name: 'Football', logo: images.football},
  {id: '3', name: 'Basketball', logo: images.baseball},
  // { id: '4', name: 'Tennis', logo: images.tennis },
  // { id: '5', name: 'Baseball', logo: images.baseball },
  // { id: '6', name: 'Badminton', logo: images.badminton },
];

const dummyAmenitiesData=[
  {id: '1', name: 'Drinking Water' },
  {id: '2', name: 'Flood Lights' },
  {id: '3', name: 'Parking' },
  {id: '4', name: 'Drinking Water' },
  {id: '5', name: 'Flood Lights' },
  {id: '6', name: 'Parking' },
]

const CourtDetail = ({navigation,route}) => {
  const courtData = route.params.courtData;
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  const renderSportCategory = item => (
    <View key={item.id} style={[styles.sportItem,mainStyles.secondaryBackgroundColor,mainStyles.dropShadowEffect]}>
      
        <Image source={item.logo} style={styles.sportLogo} />
  
      <Text style={[mainStyles.fontNunitoRegular,mainStyles.fontSize14,mainStyles.darkTextColor]}>{item.name}</Text>
    </View>
  );

  const renderAmenitiesList=(item)=>{
    return (
      <View key={item.id} style={styles.amenitiesItem}>
        <Ionicons name='car-outline' size={18} color={mainStyles.darkTextColor}/>
        <Text style={[mainStyles.fontNunitoRegular,mainStyles.fontSize14,mainStyles.darkTextColor]}>{item.name}</Text>
      </View>
    );
  }

  const amenitiesToShow = showAllAmenities ? dummyAmenitiesData : dummyAmenitiesData.slice(0, 4);


  return (
    <View style={mainStyles.container}>
      {/* Make StatusBar transparent */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        />
        
      {/* Top slider  */}
      <View style={styles.sliderContainer}>
        <Carousel
          ref={carouselRef}
          data={courtData.images}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={index => setActiveSlide(index)}
          inactiveSlideScale={1} // Keep inactive slides full size
          inactiveSlideOpacity={1}
        />
        <Pagination
          dotsLength={courtData.images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={[styles.paginationDot,mainStyles.primaryBackgroundColor]}
          inactiveDotStyle={mainStyles.secondaryBackgroundColor}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
      {/* You can add more content below the slider */}
      <View style={styles.content}>
        <View style={[boxCardStyles.firstRow, {borderBottomWidth: 0}]}>
          <View style={boxCardStyles.titleContainer}>
            <Text style={boxCardStyles.boxTitle} numberOfLines={2}>
              {courtData.title || 'Cricket Arena'}
            </Text>
            <Text style={boxCardStyles.address} numberOfLines={2}>
              {courtData.address || '123 Cricket Lane, Sportstown'}
            </Text>
          </View>
          <Text style={boxCardStyles.rating}>
            ⭐ {courtData.rating || '4.5'}
          </Text>
        </View>

        <TouchableOpacity style={[styles.locationButton,mainStyles.primaryBorderColor]}>
          <Image
            source={images.googleMapsPin}
            style={{width: scale(15), height: verticalScale(20)}}
          />
          <Text
            style={[
              mainStyles.fontNunitoRegular,
              mainStyles.fontSize14,
              mainStyles.darkTextColor,
            ]}>
            Show in Map
          </Text>
        </TouchableOpacity>

        {/* box offer container */}

        <View style={styles.offerContainer}>
          <Image
            source={icons.offerIcon}
            style={{width: scale(30), height: verticalScale(30)}}
          />
          <View>
            <Text
              style={[
                mainStyles.fontSize14,
                mainStyles.darkTextColor,
                mainStyles.fontNunitoSemibold,
              ]}>
              Upto 30% Off
            </Text>
            <Text
              style={[
                mainStyles.fontSize12,
                mainStyles.lightTextColor,
                mainStyles.fontNunitoSemibold,
              ]}>
              Get 30% Off Upto ₹2000 On All Sports
            </Text>
          </View>
        </View>

        {/*  Available Sports Container */}
        <View style={[mainStyles.marginTop10]}>
          <Text
            style={[
              mainStyles.fontSize18,
              mainStyles.fontInriaSansRegular,
              mainStyles.darkTextColor,
            ]}>
            Available Sports
          </Text>
          <View style={styles.sportsContainer}>
            {availableSportsData.map(item => renderSportCategory(item))}
          </View>
         
        </View>
        {/* Amenities Container */}
       <View style={[mainStyles.marginTop10]}>
       <View style={[mainStyles.flexContainer]}>
         <Text style={[mainStyles.fontInriaSansRegular,mainStyles.darkTextColor,mainStyles.fontSize18]}>Amenities</Text>
         <TouchableOpacity onPress={()=>setShowAllAmenities(!showAllAmenities)}>
         <Text style={[mainStyles.fontInriaSansRegular,mainStyles.primaryTextColor,mainStyles.fontSize16]}>   {showAllAmenities ? 'Show Less' : 'See All'}</Text>
         </TouchableOpacity>
            
         </View>
         <View style={styles.sportsContainer}>
                     {amenitiesToShow.map(item => renderAmenitiesList(item))}
                     {showAllAmenities &&
                       dummyAmenitiesData.length > amenitiesToShow.length &&
                       dummyAmenitiesData.slice(amenitiesToShow.length).map(item => renderAmenitiesList(item))}
                   </View>
                
       </View>

       <View >
        <Text style={[mainStyles.darkTextColor,mainStyles.fontInriaSansRegular,mainStyles.fontSize18]}>Cancellation Policy</Text>
        <View style={[mainStyles.marginTop10]}>
      
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}><Text style={{fontSize:scale(10)}}>{'\u2B24'}</Text> Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}><Text style={{fontSize:scale(10)}}>{'\u2B24'}</Text> Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}>. Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}>. Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}>. Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}>. Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}>. Lorem ipsum, dolorsit amet,cons</Text>
          <Text style={[mainStyles.lightTextColor,mainStyles.fontNunitoSemibold,mainStyles.fontSize14]}>. Lorem ipsum, dolorsit amet,cons</Text>
         
        </View>
       </View>
       
      
      </View>
    </ScrollView>
      <PrimaryButton title={'BOOK NOW'} onPress={() => navigation.navigate('Login')} disabled={undefined} style={{position:'absolute',bottom:verticalScale(10),width:'90%'}} />
    </View>
  );
};

export default CourtDetail;

const styles = StyleSheet.create({
  sliderContainer: {
    height: sliderHeight,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -16,
    alignSelf: 'center',
    // paddingVertical: 8,
  },
  paginationDot: {
    width: scale(5),
    height: verticalScale(5),
    borderRadius: moderateScale(6),
    marginHorizontal: scale(-3),
  },
  content: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(14),
  },
  locationButton: {
    borderRadius: moderateScale(7),
    width: '97%',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(10),
    flexDirection: 'row',
    gap: scale(10),
  },
  offerContainer: {
    // height:verticalScale(55),
    width: '97%',
    alignSelf: 'center',
    backgroundColor: '#C1F5CF',
    marginTop: verticalScale(15),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(10),
    gap: scale(12),
  },
  sportItem:{
    alignItems: 'center',
    justifyContent:'center',
    marginRight: scale(15),
    marginBottom: verticalScale(10),
    width:scale(85),
    height:verticalScale(60),
    borderRadius:moderateScale(4)
  },
  sportsContainer: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    justifyContent:'space-between',
    flexWrap: 'wrap',
  },
  sportLogo:{
    width:scale(22),
    height:verticalScale(22),
    marginBottom:verticalScale(5)
  },
  amenitiesItem:{
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'center',
    marginRight: scale(20),
    gap:scale(10),
    marginBottom: verticalScale(10),
  }

});
