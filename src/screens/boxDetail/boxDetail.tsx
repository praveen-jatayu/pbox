import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import mainStyles from '../../assets/styles/mainStyles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import boxCardStyles from '../../assets/styles/boxCardStyles';
import {icons} from '../../constants/Icon';
import {images} from '../../constants/image';
import PrimaryButton from '../../components/primaryButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleShowLocation} from '../../utils/showLocationUtil';
import {LazyImage} from 'react-native-lazy-image-loader';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import boxDetailStyles from '../../assets/styles/boxDetailStyles';
import {getBookingRatingReview} from '../../services/ratingAndReviewService';
import {showToast} from '../../components/toastMessage';
import ScreenWrapper from '../../components/screenWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppStackScreenProps} from '../../navigation/navigationTypes';
import {Sport} from '../types/sport';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const sliderHeight = screenHeight / 3;

const BoxDetail: React.FC<AppStackScreenProps<'BoxDetail'>> = ({
  navigation,
  route,
}) => {
  const {boxDetail, isBookmarked} = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const carouselRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const rotationAngle = useRef(0);
  // Animate slider (opacity and scale)
  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current) {
        rotationAngle.current = (rotationAngle.current + 20) % 360; // Increase heading
        mapRef.current.animateCamera(
          {
            center: {
              latitude: Number(boxDetail?.latitude),
              longitude: Number(boxDetail?.longitude),
            }, // Fixed marker position
            pitch: 90, // 3D tilt
            heading: rotationAngle.current, // Rotating angle
            zoom: 15.5, // Keep zoom level constant
          },
          {duration: 3000},
        ); // Smooth transition
      }
    }, 2700); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const sliderOpacity = scrollY.interpolate({
    inputRange: [0, sliderHeight / 2, sliderHeight],
    outputRange: [1, 0.6, 0],
    extrapolate: 'clamp',
  });

  const renderImageItem = ({item}) => {
    return (
      <LazyImage
        source={{uri: item.image}}
        style={boxDetailStyles.image}
        priority="normal"
        blurRadius={7}
        //  cullingDistance={200}
        fallbackSource={images.scenic}
      />
    );
  };

  const renderSportCategory = (item: Sport) => (
    <View
      key={item.id}
      style={[
        boxDetailStyles.sportItem,
        mainStyles.secondaryBackgroundColor,
        mainStyles.dropShadowEffect,
        {elevation: 5},
      ]}>
      <Image source={item.logo} style={boxDetailStyles.sportLogo} />

      <Text
        style={[
          mainStyles.fontNunitoRegular,
          mainStyles.fontSize14,
          mainStyles.darkTextColor,
        ]}>
        {item.name}
      </Text>
    </View>
  );

  const amenitiesData =
    boxDetail?.get_selected_amenities?.map(item => ({
      id: item?.id,
      name: item.get_single_amenities?.name,
      icon: item.get_single_amenities?.icon,
    })) || [];

  // Show limited amenities initially
  const amenitiesToShow = showAllAmenities
    ? amenitiesData
    : amenitiesData.slice(0, 2); // Change 3 to however many you want to show initially

  const renderAmenitiesList = item => (
    <View key={item.id} style={[boxDetailStyles.amenityItem]}>
      <Image source={{uri: item.icon}} style={boxDetailStyles.amenityIcon} />
      <Text
        style={[
          mainStyles.fontNunitoRegular,
          mainStyles.fontSize14,
          mainStyles.darkTextColor,
        ]}>
        {item.name}
      </Text>
    </View>
  );

  const AnimatedHeader = ({scrollY, boxDetail}) => {
    const insets = useSafeAreaInsets();
    console.log(insets);
    const headerTranslateY = scrollY.interpolate({
      inputRange: [0, sliderHeight],
      outputRange: [-150, 0],
      extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [0, sliderHeight + 30],
      outputRange: [0.6, 1],
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
            height: verticalScale(60) + insets.top,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(4),
            paddingTop: insets.top,
            transform: [{translateY: headerTranslateY}],
            opacity: headerOpacity,
            elevation: 5,
            zIndex: 10,
            gap: scale(7),
          },
          mainStyles.primaryBackgroundColor,
        ]}>
        <EvilIcons
          name="chevron-left"
          size={38}
          color={'white'}
          onPress={() => navigation.goBack()}
        />
        <View style={{width: '80%', gap: verticalScale(3)}}>
          <Text
            style={[
              mainStyles.fontSize16,
              mainStyles.fontNunitoRegular,
              {color: 'white'},
            ]}>
            {boxDetail?.title}
          </Text>
          <Text
            style={[
              mainStyles.fontSize14,
              mainStyles.fontNunitoRegular,
              {color: 'white'},
            ]}
            numberOfLines={2}>
            {boxDetail?.address}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const fetchReviews = async () => {
    const formData = new FormData();
    formData.append('box_id', boxDetail.id);
    try {
      const response = await getBookingRatingReview(formData);
      if (response) {
        console.log('review', response);
        // const reviewsToShow=response.slice(0,2)
        setReviewData(response);
      } else {
        console.log('Failed to fetch reviews');
        showToast('error', 'Failed to fetch reviews');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        showToast('error', error.message);
      }
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ScreenWrapper
      safeTop={false}
      safeBottom={true}
      scrollable={false}
      padding={false}
      withHeader={false}
      keyboardAvoiding={false}
      statusBarTranslucent
      statusBarBackgroundColor="transparent"
      statusBarStyle="light-content">
      <AnimatedHeader scrollY={scrollY} boxDetail={boxDetail} />
      <Animated.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: verticalScale(100),
          minHeight: verticalScale(300),
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        {/* Top slider  */}
        <Animated.View
          style={[boxDetailStyles.sliderContainer, {opacity: sliderOpacity}]}>
          <Carousel
            ref={carouselRef}
            data={boxDetail?.get_selected_box_images}
            renderItem={renderImageItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            onSnapToItem={index => setActiveSlide(index)}
            inactiveSlideScale={1} // Keep inactive slides full size
            inactiveSlideOpacity={1}
          />
          <Pagination
            dotsLength={boxDetail?.get_selected_box_images?.length}
            activeDotIndex={activeSlide}
            containerStyle={boxDetailStyles.paginationContainer}
            dotStyle={[
              boxDetailStyles.paginationDot,
              mainStyles.primaryBackgroundColor,
            ]}
            inactiveDotStyle={mainStyles.secondaryBackgroundColor}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
          {/* top navigating icons container */}
          <View style={boxDetailStyles.topIconsContainer}>
            <TouchableOpacity
              style={[
                boxDetailStyles.iconButton,
                mainStyles.secondaryBackgroundColor,
              ]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}>
              <EvilIcons name="chevron-left" size={moderateScale(28)} />
            </TouchableOpacity>
            <View style={boxDetailStyles.rightIconsContainer}>
              <TouchableOpacity
                style={[
                  boxDetailStyles.iconButton,
                  mainStyles.secondaryBackgroundColor,
                ]}
                onPress={undefined}
                activeOpacity={0.8}>
                {isBookmarked ? (
                  <Ionicons
                    name="heart"
                    size={moderateScale(18)}
                    color={'red'}
                  />
                ) : (
                  <EvilIcons name="heart" size={moderateScale(20)} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  boxDetailStyles.iconButton,
                  mainStyles.secondaryBackgroundColor,
                ]}
                onPress={undefined}
                activeOpacity={0.8}>
                <MaterialCommunityIcons name="share-outline" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* You can add more content below the slider */}
        <View style={boxDetailStyles.content}>
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
              ⭐ {boxDetail?.avg_rating || 'N/A'}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              boxDetailStyles.locationButton,
              mainStyles.primaryBorderColor,
            ]}
            onPress={() =>
              handleShowLocation(boxDetail?.latitude, boxDetail?.longitude)
            }>
            <Image
              source={images.googleMapsPin}
              style={{
                width: moderateScale(16, 0.8),
                height: moderateVerticalScale(22),
              }}
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

          <View style={boxDetailStyles.offerContainer}>
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
            <View style={boxDetailStyles.sportsContainer}>
              {(boxDetail?.get_selected_available_sport || []).map(item =>
                renderSportCategory({
                  id: item.get_single_sports.id,
                  name: item.get_single_sports.name,
                  logo: {uri: item.get_single_sports.image}, // Ensure correct image format
                }),
              )}
            </View>
          </View>
          {/* Amenities Container */}
          <View style={[mainStyles.marginTop10]}>
            <View style={[mainStyles.flexContainer]}>
              <Text
                style={[
                  mainStyles.fontInriaSansRegular,
                  mainStyles.darkTextColor,
                  mainStyles.fontSize18,
                ]}>
                Amenities
              </Text>

              <TouchableOpacity
                onPress={() => setShowAllAmenities(!showAllAmenities)}>
                <Text
                  style={[
                    mainStyles.fontInriaSansRegular,
                    mainStyles.primaryTextColor,
                    mainStyles.fontSize16,
                  ]}>
                  {showAllAmenities ? 'Show Less' : 'See All'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={boxDetailStyles.sportsContainer}>
              {amenitiesToShow.map(item => renderAmenitiesList(item))}
            </View>
          </View>
          {/* Cancelation Policy Container */}
          <View>
            <Text
              style={[
                mainStyles.darkTextColor,
                mainStyles.fontInriaSansRegular,
                mainStyles.fontSize18,
              ]}>
              Cancellation Policy
            </Text>

            <View style={[mainStyles.marginTop10, {marginLeft: scale(10)}]}>
              {(boxDetail?.get_box_cancellation_policy || []).map(item => (
                <Text
                  key={item.id}
                  style={[
                    mainStyles.lightTextColor,
                    mainStyles.fontNunitoSemibold,
                    mainStyles.fontSize14,
                  ]}>
                  <Text style={{fontSize: scale(9)}}>{'\u2B24'}</Text>{' '}
                  {item.text}
                </Text>
              ))}
            </View>
          </View>

          {/* Client review and comments container */}
          <View style={[mainStyles.marginTop20]}>
            <View style={[mainStyles.flexContainer]}>
              <Text
                style={[
                  mainStyles.fontInriaSansRegular,
                  mainStyles.darkTextColor,
                  mainStyles.fontSize18,
                ]}>
                What Client Says
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ClientReview', {boxDetail: boxDetail})
                }>
                <Text
                  style={[
                    mainStyles.fontInriaSansRegular,
                    mainStyles.primaryTextColor,
                    mainStyles.fontSize16,
                  ]}>
                  {' '}
                  {'See All'}
                </Text>
              </TouchableOpacity>
            </View>
            {reviewData.slice(0, 2).map((review, index) => (
              <View
                key={review?.id}
                style={[
                  boxDetailStyles.reviewContainer,
                  mainStyles.secondaryBackgroundColor,
                  mainStyles.dropShadowEffect,
                  {elevation: 1.5},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: scale(20),
                  }}>
                  <Image
                    source={
                      review?.get_selected_user?.profile_pic
                        ? {uri: review.get_selected_user.profile_pic}
                        : images.profile // Local fallback image
                    }
                    style={boxDetailStyles.profilePic}
                  />
                  <View style={{width: '59%'}}>
                    <Text
                      style={[
                        mainStyles.fontNunitoMedium,
                        mainStyles.darkTextColor,
                        mainStyles.fontSize16,
                      ]}>
                      {review?.get_selected_user?.name}
                    </Text>
                    <View style={[mainStyles.flexContainer, {gap: scale(12)}]}>
                      <Text
                        style={[
                          mainStyles.fontNunitoMedium,
                          mainStyles.fontSize14,
                          mainStyles.lightTextColor,
                        ]}
                        numberOfLines={2}>
                        {review?.review}
                      </Text>
                      <Text
                        style={[
                          mainStyles.fontNunitoMedium,
                          mainStyles.fontSize12,
                          mainStyles.lightTextColor,
                        ]}>
                        {review?.booking_date}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* box roating location map view */}
          <View style={boxDetailStyles.mapViewContainer}>
            {/* <View style={boxDetailStyles.mapWrapper}> */}
            <MapView
              ref={mapRef}
              style={boxDetailStyles.map}
              initialCamera={{
                center: {
                  latitude: Number(boxDetail?.latitude),
                  longitude: Number(boxDetail?.longitude),
                }, // San Francisco
                pitch: 60, // Adjust 3D tilt
                heading: 45, // Rotate the map
                altitude: 500, // Zoom level
                zoom: 15,
              }}
              mapType="terrain"
              showsBuildings={true} // Enables 3D buildings
              showsCompass={true} // Shows compass to rotate map
              scrollEnabled={false} // Disables scrolling/panning
              zoomEnabled={false} // Disables zooming
              pitchEnabled={false} // Disables tilt/3D angle change
              rotateEnabled={false}
              onRegionChangeComplete={region => {
                console.log('Map Region:', region);
              }}>
              {/* Fixed Marker */}
              <Marker
                coordinate={{
                  latitude: Number(boxDetail?.latitude),
                  longitude: Number(boxDetail?.longitude),
                }}
              />
            </MapView>
            {/* </View> */}
            <LinearGradient
              colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0)']} // Fade from white to transparent
              style={boxDetailStyles.gradientOverlay}
            />
          </View>
        </View>
      </Animated.ScrollView>
      <PrimaryButton
        title={'BOOK NOW'}
        onPress={() => navigation.navigate('SlotBooking', {boxInfo: boxDetail})}
        disabled={undefined}
        style={{
          position: 'absolute',
          bottom: moderateVerticalScale(10),
          width: '90%',
        }}
      />
    </ScreenWrapper>
  );
};

export default BoxDetail;
