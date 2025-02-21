import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import mainStyles from '../../assets/styles/mainStyles';
import { COLORS } from '../../constants/colorConstant';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import boxCardStyles from '../../assets/styles/boxCardStyles';
import { FONTS } from '../../constants/fontConstant';
import { icons } from '../../constants/Icon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const sliderHeight = screenHeight / 3;



const CourtDetail = ({route}) => {
  const courtData=route.params.courtData
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View >
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={mainStyles.container}>
      {/* Make StatusBar transparent */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {/* Top slider  */}
      <View style={styles.sliderContainer}>
        <Carousel
          ref={carouselRef}
          data={courtData.images}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={(index) => setActiveSlide(index)}
          inactiveSlideScale={1}       // Keep inactive slides full size
          inactiveSlideOpacity={1} 
        />
        <Pagination
          dotsLength={courtData.images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>

      {/* You can add more content below the slider */}
      <View style={styles.content}>
         <View style={[boxCardStyles.firstRow,{borderBottomWidth:0}]}>
                  <View style={boxCardStyles.titleContainer}>
                    <Text style={boxCardStyles.boxTitle} numberOfLines={2}>
                      {courtData.title || 'Cricket Arena'}
                    </Text>
                    <Text style={boxCardStyles.address} numberOfLines={2}>
                      {courtData.address || '123 Cricket Lane, Sportstown'}
                    </Text>
                  </View>
                  <Text style={boxCardStyles.rating}>⭐ {courtData.rating || '4.5'}</Text>
                </View>

                <TouchableOpacity style={styles.locationButton}>
                  <Text style={styles.locationText}>Show in Map</Text>
                </TouchableOpacity>

                {/* box offer container */}

                <View style={styles.offerContainer}>
                  <Image source={icons.offerIcon} style={{width:scale(30),height:verticalScale(30)}}/>
                 <View>
                  <Text style={{fontFamily:FONTS.nunitoSemiBold,fontSize:scale(15),color:COLORS.darkText}}>Upto 30% Off</Text>
                  <Text style={{fontFamily:FONTS.nunitoSemiBold,fontSize:scale(12),color:COLORS.darkText}}>Get 30% Off Upto ₹2000 On All Sports</Text>
                 </View>

                </View>

                {/*  Available Sports Container */}
<View>
  <Text>Available Sports</Text>
</View>

      </View>
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
    backgroundColor: COLORS.primary
  },
  inactiveDot:{
    backgroundColor: COLORS.secondary
  },
  content: {
    
    paddingHorizontal:scale(16),
    paddingTop:verticalScale(14)
  },
  locationButton:{
    borderColor:COLORS.borderColor,
    borderRadius:moderateScale(7),
    width:'97%',
    borderWidth:1,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    paddingVertical:verticalScale(12),
    marginTop:verticalScale(10)
  },
  locationText:{
    fontFamily:FONTS.nunitoRegular,
    fontSize:scale(14),
    color:COLORS.darkText
  },
  offerContainer:{
    // height:verticalScale(55),
    width:'97%',
    alignSelf:'center',
    backgroundColor:'#C1F5CF',
    marginTop:verticalScale(15),
    borderRadius:moderateScale(8),
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:verticalScale(14),
    paddingHorizontal:scale(10),
    gap:scale(12)
  }

});
