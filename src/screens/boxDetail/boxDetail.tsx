import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import mainStyles from '../../assets/styles/mainStyles';
import {moderateScale, moderateVerticalScale, scale, verticalScale} from 'react-native-size-matters';
import boxCardStyles from '../../assets/styles/boxCardStyles';
import {icons} from '../../constants/Icon';
import {images} from '../../constants/image';
import PrimaryButton from '../../components/primaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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


const dummyReviews = [
  {
    id: '1',
    profilePic: images.profile, // update with your image
    name: 'John Doe',
    review: 'Great facility and well maintained.',
    date: '2025-01-10'
  },
  {
    id: '2',
    profilePic: images.profile, // update with your image
    name: 'Jane Smith',
    review: 'Had an amazing experience here.',
    date: '2025-01-12'
  },
  {
    id: '3',
    profilePic: images.profile, // update with your image
    name: 'Alex Johnson',
    review: 'Good value for money!',
    date: '2025-01-15'
  },
  // ... add more reviews as needed
];


const image = [
  {
    title: 'Beautiful Landscape',
    illustration: images.scenic,
  },
  {
    title: 'City at Night',
    illustration: images.scenic,
  },
  {
    title: 'Mountain Adventure',
    illustration: images.scenic,
  },
  {
    title: 'Mountain Adventure',
    illustration: images.scenic,
  },
  {
    title: 'Mountain Adventure',
    illustration: images.scenic,
  },
];
const BoxDetail = ({navigation,route}) => {
  const {boxDetail} = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [amenities,setAmenities]=useState([])
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReview, setShowAllReviews] = useState(false);
  const carouselRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animate slider (opacity and scale)
  const sliderOpacity = scrollY.interpolate({
    inputRange: [0, sliderHeight / 2, sliderHeight],
    outputRange: [1, 0.6, 0],
    extrapolate: 'clamp',
  });

  // const sliderScale = scrollY.interpolate({
  //   inputRange: [0, sliderHeight],
  //   outputRange: [1, 0.5],
  //   extrapolate: 'clamp',
  // });

  // Show header when slider disappears
 

  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={item.illustration} style={styles.image} />
      </View>
    );
  };

  const renderSportCategory = item => (
    <View key={item.id} style={[styles.sportItem,mainStyles.secondaryBackgroundColor,mainStyles.dropShadowEffect,{elevation:5}]}>
      
        <Image source={item.logo} style={styles.sportLogo} />
  
      <Text style={[mainStyles.fontNunitoRegular,mainStyles.fontSize14,mainStyles.darkTextColor]}>{item.name}</Text>
    </View>
  );

 
  const amenitiesData = boxDetail?.get_selected_amenities?.map(item => ({
    id: item?.id,
    name: item.get_single_amenities?.name,
    icon: item.get_single_amenities?.icon
})) || [];

// Show limited amenities initially
const amenitiesToShow = showAllAmenities 
    ? amenitiesData 
    : amenitiesData.slice(0, 3); // Change 3 to however many you want to show initially

const renderAmenitiesList = (item) => (
    <View key={item.id} style={[styles.amenityItem]}>
        <Image source={{ uri: item.icon }} style={styles.amenityIcon} />
        <Text style={[mainStyles.fontNunitoRegular, mainStyles.fontSize14, mainStyles.darkTextColor]}>
            {item.name}
        </Text>
    </View>
);

  const reviewsToShow = dummyReviews.slice(0, 2);


  const AnimatedHeader = ({ scrollY, boxDetail }) => {
    const headerTranslateY = scrollY.interpolate({
      inputRange: [0, sliderHeight],
      outputRange: [-150, 0],
      extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [0, sliderHeight+30],
      outputRange: [0.6,1],
      extrapolate: 'clamp',
    });
  
    return (
      <Animated.View
        style={[
          {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: verticalScale(90),
          flexDirection:'row',
          alignItems:'center',
          paddingHorizontal: scale(4),
          paddingTop:verticalScale(17),
          transform: [{ translateY: headerTranslateY }],
         opacity:headerOpacity,
          elevation: 5,
          zIndex: 10,
          gap:scale(7)
          },
          mainStyles.primaryBackgroundColor]}>
          <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        />
        <EvilIcons name="chevron-left" size={38} color={'white'} onPress={()=>navigation.goBack()}/>
        <View>
        <Text style={[mainStyles.fontSize16,mainStyles.fontNunitoRegular,{color:'white'}]}>{boxDetail?.title}</Text>
        <Text style={[mainStyles.fontSize14,mainStyles.fontNunitoRegular,{color:'white'}]}>{boxDetail?.address}</Text>
        </View>
      </Animated.View>
    );
  };


  return (
    <View style={mainStyles.container}>
      {/* Make StatusBar transparent */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        />
          <AnimatedHeader scrollY={scrollY} boxDetail={boxDetail} />
          <Animated.ScrollView contentContainerStyle={{flexGrow:1, paddingBottom: verticalScale(100)}} showsVerticalScrollIndicator={false}
       onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
       scrollEventThrottle={16}>
        
      {/* Top slider  */}
      <Animated.View style={[styles.sliderContainer, {opacity: sliderOpacity}]}>
        <Carousel
          ref={carouselRef}
          data={image}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={index => setActiveSlide(index)}
          inactiveSlideScale={1} // Keep inactive slides full size
          inactiveSlideOpacity={1}
        />
        <Pagination
          dotsLength={image.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={[styles.paginationDot,mainStyles.primaryBackgroundColor]}
          inactiveDotStyle={mainStyles.secondaryBackgroundColor}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
        {/* top navigating icons container */}
        <View style={styles.topIconsContainer}>
      <TouchableOpacity
        style={[styles.iconButton, mainStyles.secondaryBackgroundColor]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <EvilIcons name="chevron-left" size={moderateScale(28)} />
      </TouchableOpacity>
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity
          style={[styles.iconButton, mainStyles.secondaryBackgroundColor]}
          onPress={undefined}
          activeOpacity={0.8}
        >
          <EvilIcons name="heart" size={moderateScale(20)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, mainStyles.secondaryBackgroundColor]}
          onPress={undefined}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="share-outline" size={20} />
        </TouchableOpacity>
      </View>
    </View>
        </Animated.View>
    
      {/* You can add more content below the slider */}
      <View style={styles.content}>
        <View style={[boxCardStyles.firstRow, {borderBottomWidth: 0}]}>
          <View style={boxCardStyles.titleContainer}>
            <Text style={boxCardStyles.boxTitle} numberOfLines={2}>
              {boxDetail?.title || '---'}
            </Text>
            <Text style={boxCardStyles.address} numberOfLines={2}>
              {boxDetail?.address || '----'}
            </Text>
          </View>
          <Text style={boxCardStyles.rating}>
            ⭐ {boxDetail?.rating || '4.5'}
          </Text>
        </View>

        <TouchableOpacity style={[styles.locationButton,mainStyles.primaryBorderColor]}>
          <Image
            source={images.googleMapsPin}
            style={{width: moderateScale(15,0.8), height: moderateVerticalScale(20)}}
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
          {(boxDetail?.get_selected_available_sport || []).map(item =>
        renderSportCategory({
            id: item.get_single_sports.id,
            name: item.get_single_sports.name,
            logo: { uri: item.get_single_sports.icon }  // Ensure correct image format
        })
    )}
          </View>
         
        </View>
        {/* Amenities Container */}
        <View style={[mainStyles.marginTop10]}>
            <View style={[mainStyles.flexContainer]}>
                <Text style={[
                    mainStyles.fontInriaSansRegular,
                    mainStyles.darkTextColor,
                    mainStyles.fontSize18
                ]}>
                    Amenities
                </Text>

                <TouchableOpacity onPress={() => setShowAllAmenities(!showAllAmenities)}>
                    <Text style={[
                        mainStyles.fontInriaSansRegular,
                        mainStyles.primaryTextColor,
                        mainStyles.fontSize16
                    ]}>
                        {showAllAmenities ? 'Show Less' : 'See All'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sportsContainer}>
                {amenitiesToShow.map(item => renderAmenitiesList(item))}
            </View>
        </View>
{/* Cancelation Policy Container */}
<View>
    <Text
        style={[
            mainStyles.darkTextColor,
            mainStyles.fontInriaSansRegular,
            mainStyles.fontSize18
        ]}
    >
        Cancellation Policy
    </Text>

    <View style={[mainStyles.marginTop10, { marginLeft: scale(10) }]}>
        {(boxDetail?.get_box_cancellation_policy || []).map(item => (
            <Text
                key={item.id}
                style={[
                    mainStyles.lightTextColor,
                    mainStyles.fontNunitoSemibold,
                    mainStyles.fontSize14
                ]}
            >
                <Text style={{ fontSize: scale(9) }}>{'\u2B24'}</Text>{' '}
                {item.text}
            </Text>
        ))}
    </View>
</View>
       
      {/* Client review and comments container */}
      <View style={[mainStyles.marginTop20]}>
       <View style={[mainStyles.flexContainer]}>
         <Text style={[mainStyles.fontInriaSansRegular,mainStyles.darkTextColor,mainStyles.fontSize18]}>What Client Says</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('ClientReview',{ reviews: dummyReviews })}>
         <Text style={[mainStyles.fontInriaSansRegular,mainStyles.primaryTextColor,mainStyles.fontSize16]}>   {showAllReview ? 'Show Less' : 'See All'}</Text>
         </TouchableOpacity>
            
         </View>
         {reviewsToShow.map((review,index) => (
              <View key={review.id} style={[styles.reviewContainer,mainStyles.secondaryBackgroundColor,mainStyles.dropShadowEffect,{elevation:1.5}]}>
               <View style={{flexDirection:'row',alignItems:'center',gap:scale(20)}}>
                
                <Image source={review.profilePic} style={styles.profilePic} />
                <View style={{width:'59%'}}>
                  <Text style={[mainStyles.fontNunitoMedium, mainStyles.darkTextColor,mainStyles.fontSize16]}>
                    {review.name}
                  </Text>
                  <View style={[mainStyles.flexContainer,{gap:scale(12)}]}>
                  <Text style={[mainStyles.fontNunitoMedium, mainStyles.fontSize14, mainStyles.lightTextColor]} numberOfLines={2}>
                    {review.review}
                  </Text>
                  <Text style={[mainStyles.fontNunitoMedium,mainStyles.fontSize12,mainStyles.lightTextColor]}>
                    {review.date}
                  </Text>
                  </View>
                </View>
                </View>
              </View>
            ))}
      </View>
      </View>
    </Animated.ScrollView>
      <PrimaryButton title={'BOOK NOW'} onPress={() => navigation.navigate('SlotBooking')} disabled={undefined} style={{position:'absolute',bottom:moderateVerticalScale(10),width:'90%'}} />
    </View>
  );
};

export default BoxDetail;

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
    justifyContent:'space-evenly',
    flexWrap: 'wrap',
  },
  sportLogo:{
    width:scale(22),
    height:verticalScale(22),
    marginBottom:verticalScale(5)
  },
  amenityItem:{
    alignItems: 'center',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-evenly',
    marginRight: scale(20),
    gap:scale(10),
    marginBottom: verticalScale(10),
  },
  amenityIcon: {
    width: moderateScale(24),
    height: moderateVerticalScale(24),
    resizeMode: 'contain'
},
  reviewContainer:{
    paddingTop:verticalScale(5),
    paddingBottom:verticalScale(10),
    paddingHorizontal:scale(12),
    marginTop:verticalScale(16),
    borderRadius:moderateScale(9),
  },
  profilePic:{
    width:moderateScale(32),
    height:moderateVerticalScale(32),
    borderRadius:moderateScale(20)
  },
  topIconsContainer: {
    position: 'absolute',
    top: verticalScale(36),
    left: scale(20),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10), // Note: if 'gap' is not supported, use margin on children
  },
  iconButton: {
    width: moderateScale(26,0.8),
    height: moderateVerticalScale(26,0.6),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 5,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

});
