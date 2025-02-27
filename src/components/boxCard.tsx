import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Pressable, 
  Animated, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../constants/Icon';
import boxCardStyles from '../assets/styles/boxCardStyles';

const { width: screenWidth } = Dimensions.get('window');

const BoxCard = ({ data ,isBookmarked='false'}) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [bookmarkToggle, setBookmarkToggle] = useState(isBookmarked);
  const navigation = useNavigation();

  // Entrance Animation (fade in & slide up)
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  // Offer Pulse Animation (scale up & down)
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const renderImageItem = ({ item }) => (
    <Image source={item} style={boxCardStyles.sliderImage} />
  );

  const handleBookmarkPress = () => {
    setBookmarkToggle(!bookmarkToggle);
  };

  return (
    <Pressable onPress={()=>navigation.navigate('BoxDetail',{boxData:data})}>
    <Animated.View
      style={[
        boxCardStyles.cardContainer,
        {
          opacity: animatedValue,
          transform: [{ translateY }],
        },
      ]}
    >
      {/* Image slider */}
      <View style={boxCardStyles.sliderContainer}>
        <Carousel
          ref={carouselRef}
          data={data.images}
          renderItem={renderImageItem}
          sliderWidth={screenWidth - scale(32)}
          itemWidth={screenWidth - scale(40)}
          onSnapToItem={(index) => setActiveSlide(index)}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={0.95}
        />
        <Pagination
          dotsLength={data.images.length}
          activeDotIndex={activeSlide}
          containerStyle={boxCardStyles.paginationContainer}
          dotStyle={boxCardStyles.paginationDotActive}
          inactiveDotStyle={boxCardStyles.paginationDotInactive}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
        {/* Card label */}
        <View style={boxCardStyles.cardLabel}>
          <Text style={boxCardStyles.labelText}>Bookable</Text>
        </View>
        {/* Sports category label */}
        <View style={boxCardStyles.sportsCategoryLabel}>
          <Image source={icons.badmintonOutline} style={boxCardStyles.categoryIcon} />
          <Text style={boxCardStyles.categorySeparator}>|</Text>
          <Image source={icons.baseballOutline} style={boxCardStyles.categoryIcon} />
        </View>
        {/* Bookmark icon */}
        <View style={boxCardStyles.bookMarkContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleBookmarkPress}>
            <Image
              source={bookmarkToggle ? icons.heartIconFilled : icons.heartIconActive}
              style={[
                boxCardStyles.bookmarkIcon,
                bookmarkToggle && boxCardStyles.bookmarkIconToggled,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Details */}
      <View style={boxCardStyles.detailsContainer}>
        {/* First Row: Title, Rating, Address */}
        <View style={boxCardStyles.firstRow}>
          <View style={boxCardStyles.titleContainer}>
            <Text style={boxCardStyles.boxTitle} numberOfLines={2}>
              {data.title || 'Cricket Arena'}
            </Text>
            <Text style={boxCardStyles.address} numberOfLines={2}>
              {data.address || '123 Cricket Lane, Sportstown'}
            </Text>
          </View>
          <Text style={boxCardStyles.rating}>⭐ {data.rating || '4.5'}</Text>
        </View>
        {/* Second Row: Starting Price and Offers */}
        <View style={boxCardStyles.secondRow}>
          <Animated.View style={[boxCardStyles.offerContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Image source={icons.offerIcon} style={boxCardStyles.offerIcon} />
            <Text style={boxCardStyles.offers}>{data.offers || 'Upto 30% Off'}</Text>
          </Animated.View>
          <Text style={boxCardStyles.price}>{data.price || 'INR 400 Onwards'}</Text>
        </View>
      </View>
    </Animated.View>
    </Pressable>
  );
};

export default BoxCard;
