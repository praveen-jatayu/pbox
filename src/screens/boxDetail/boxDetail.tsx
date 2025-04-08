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
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const sliderHeight = screenHeight / 3;



const BoxDetail = ({navigation, route}) => {
  // const {boxDetail, isBookmarked} = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const carouselRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const rotationAngle = useRef(0);
  
  return (
    <View style={mainStyles.container}>
      {/* Make StatusBar transparent */}
    
    
      <PrimaryButton
        title={'BOOK NOW'}
        onPress={() => navigation.navigate('SlotBooking')}
        disabled={undefined}
        style={{
          position: 'absolute',
          bottom: moderateVerticalScale(10),
          width: '90%',
        }}
      />
    </View>
  );
};

export default BoxDetail;
