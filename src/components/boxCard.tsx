import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../constants/colorConstant';
import { FONTS } from '../constants/fontConstant';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');


const BoxCard = ({data}) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation=useNavigation()

  const renderImageItem = ({ item }) => (
    <Image source={item} style={styles.sliderImage} />
  );

  return (
    <View style={styles.cardContainer}  >
      {/* Image slider */}
      <View style={styles.sliderContainer}>
        <Carousel
          ref={carouselRef}
          data={data.images}
          renderItem={renderImageItem}
          sliderWidth={screenWidth - scale(32)}
          itemWidth={screenWidth - scale(32)}
          onSnapToItem={(index) => setActiveSlide(index)}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={0.95}
        //   loop={true}
        //   autoplay={true}
        //   autoplayInterval={3000}
        />
        <Pagination
          dotsLength={data.images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#FFFFFF'}
          inactiveDotOpacity={1}
          inactiveDotScale={0.5}
        />
     {/* card label  */}
        <View style={styles.cardLabel}>
            <Text style={styles.labelText}>Bookable</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        {/* First Row: Title, Rating, Address */}
        <View style={styles.firstRow}>
            <View>
          <Text style={styles.boxTitle}>Cricket Arena</Text>
          <Text style={styles.address}>123 Cricket Lane, Sportstown</Text>
          </View>
          
        <Text style={styles.rating}>⭐ 4.5</Text>
        </View>

        {/* Second Row: Starting Price and Offers */}
        <View style={styles.secondRow}>
          <Text style={styles.price}>Starting at ₹500</Text>
          <Text style={styles.offers}>20% OFF</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: moderateScale(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: moderateScale(8),
   marginVertical:verticalScale(10),
    paddingHorizontal:scale(4),
    paddingVertical:verticalScale(10),
    overflow: 'hidden',
    width:scale(305),
    // width:'100%',
    alignSelf:'center'
  },
  sliderContainer: {
    height: verticalScale(130),
    alignSelf:'center',
    width:scale(290),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:moderateScale(10),
    overflow:'hidden',

  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: verticalScale(-18),
    alignSelf: 'center',
  },
  paginationDot: {
    width: moderateScale(5),
    height: moderateVerticalScale(5),
    borderRadius: scale(4),
    backgroundColor: COLORS.primary,
  },
  detailsContainer: {
    // padding: scale(12),
    paddingVertical:verticalScale(8),
    paddingHorizontal:scale(8)
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:verticalScale(14),
    borderBottomColor:COLORS.lightBorder,
    borderBottomWidth:1
  },
  boxTitle: {
    fontFamily: FONTS.inriaSansRegular,
    fontSize: scale(18),
    color: COLORS.darkText,
  },
  rating: {
    fontFamily: FONTS.nunitoMedium,
    fontSize: scale(14),
    color: COLORS.darkText,
  },
  address: {
    fontFamily: FONTS.nunitoSemiBold,
    fontSize: scale(13),
    color: COLORS.lightText,
    marginTop: verticalScale(4),
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  
  },
  price: {
    fontFamily: FONTS.inriaSansBold,
    fontSize: scale(16),
    color: COLORS.primary,
  },
  offers: {
    fontFamily: FONTS.nunitoMedium,
    fontSize: scale(14),
    color: COLORS.secondary,
  },
  cardLabel:{
    position:'absolute',
    alignSelf:'flex-start',
    top:verticalScale(10),
    left:scale(10),
    backgroundColor:"rgba(57, 49, 49, 0.16)",
    padding:scale(2),
    borderRadius:moderateScale(4),
    
  },
  labelText:{
    color:COLORS.secondary,
    fontFamily:FONTS.nunitoRegular,
    fontSize:scale(12),
  }
});

export default BoxCard;
