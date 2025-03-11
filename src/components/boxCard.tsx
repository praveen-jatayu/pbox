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
import { updateBookmark } from '../services/apiService/bookmarkService';
import { images } from '../constants/image';
import Toast from 'react-native-toast-message';

const { width: screenWidth } = Dimensions.get('window');

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

const BoxCard = ({ boxData ,isBookmarked=false,onAction}) => {
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
    <Image source={item.illustration} style={boxCardStyles.sliderImage} />
  );
// handle bookmark press


  const handleBookmarkPress = async() => {
    setBookmarkToggle(!bookmarkToggle);

    let formData=new FormData()
    formData.append('box_id',boxData.id)
    formData.append('is_bookmark',bookmarkToggle?1:0)

    try{
    const {success,message}=await updateBookmark(formData)
    if(success){
     Toast.show({
                     type: 'success',
                     text1: 'Success!!!',
                     text2: message || 'Something went wrong!',
                   });
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'Failed!!!',
        text2: message || 'Something went wrong!',
      });
    }
  }
  catch(error) {
    console.log(error.message);
  }
}

  const handleBoxCardPress=()=>{
    navigation.navigate('BoxDetail',{boxDetail:boxData})
    onAction={boxData}
  }
  return (
    <Pressable onPress={handleBoxCardPress}>
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
          data={image}
          renderItem={renderImageItem}
          sliderWidth={screenWidth - scale(32)}
          itemWidth={screenWidth - scale(40)}
          onSnapToItem={(index) => setActiveSlide(index)}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={0.95}
        />
        <Pagination
          dotsLength={image.length}
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
              {boxData.title || 'Cricket Arena'}
            </Text>
            <Text style={boxCardStyles.address} numberOfLines={2}>
              {boxData.address || '123 Cricket Lane, Sportstown'}
            </Text>
          </View>
          <Text style={boxCardStyles.rating}>⭐ {boxData.rating || '4.5'}</Text>
        </View>
        {/* Second Row: Starting Price and Offers */}
        <View style={boxCardStyles.secondRow}>
          <Animated.View style={[boxCardStyles.offerContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Image source={icons.offerIcon} style={boxCardStyles.offerIcon} />
            <Text style={boxCardStyles.offers}>{boxData.offers || 'Upto 30% Off'}</Text>
          </Animated.View>
          <Text style={boxCardStyles.price}>{boxData.price || 'INR 400 Onwards'}</Text>
        </View>
      </View>
    </Animated.View>
    </Pressable>
  );
};

export default BoxCard;
