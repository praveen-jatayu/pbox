import React, {useRef} from 'react';
import {View, Image, StyleSheet, Dimensions, Pressable} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS} from '../../../constants/colorConstant';
import {images} from '../../../constants/image';
import {icons} from '../../../constants/Icon';

const {width: screenWidth} = Dimensions.get('window');

const data = [
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

const ImageSlider = ({onSlidePress}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <Pressable onPress={() => onSlidePress(item)}>
        <View style={styles.item}>
          <View style={styles.rightArrowContainer}>
            <Image source={icons.rightArrowIcon} style={{width: scale(12)}} />
          </View>
          <Image source={item.illustration} style={styles.image} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - scale(60)}
        data={data}
        enableSnap
        renderItem={renderItem}
        inactiveSlideScale={0.92}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.carousel}
        contentContainerCustomStyle={styles.sliderContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: verticalScale(5),
  },
  carousel: {
    overflow: 'visible',
  },
  sliderContentContainer: {
    paddingVertical: verticalScale(10),
  },

  item: {
    width: screenWidth - scale(58),
    height: moderateVerticalScale(145),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.secondary,
    overflow: 'hidden',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rightArrowContainer: {
    position: 'absolute',
    height: moderateScale(25),
    width: moderateScale(25),
    backgroundColor: COLORS.secondary,
    zIndex: 1,
    alignSelf: 'flex-end',
    bottom: verticalScale(12),
    right: scale(10),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageSlider;
