import {
  View,
  Text,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import PrimaryButton from '../../components/primaryButton';
import {scale, verticalScale} from 'react-native-size-matters';
import TextInputComponent from '../../components/textInputComponent';
import StarRating from 'react-native-star-rating-widget';
import {COLORS} from '../../constants/color';
import Toast from 'react-native-toast-message';
import {updateReviewAndRating} from '../../services/ratingAndReviewService';
import {showToast} from '../../components/toastMessage';
import ScreenWrapper from '../../components/screenWrapper';

const AddRatingAndReview = ({navigation, route}) => {
  const {boxData} = route.params;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // State to store user rating

  const handleAddRatingAndReview = async () => {
    const formData = new FormData();
    formData.append('box_id', boxData.id);
    formData.append('rating', rating);
    formData.append('review', review);
    try {
      const {success, message} = await updateReviewAndRating(formData);
      if (success) {
        showToast('success', 'Review Added successfully!');
      } else {
        showToast('error', message);
      }
    } catch (error) {
      console.log('Error adding booking :', error.message);
      showToast('error', error.message);
    }
  };
  return (
    <ScreenWrapper
      safeTop={false}
      safeBottom={false}
      scrollable={false}
      padding={false}
      withHeader={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              mainStyles.container,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                right: scale(16),
                top: verticalScale(50),
              }}
              onPress={() => navigation.navigate('BottomNav')}
              activeOpacity={0.8}>
              <Text
                style={[
                  mainStyles.fontNunitoMedium,
                  mainStyles.lightTextColor,
                  mainStyles.fontSize12,
                ]}>
                SKIP
              </Text>
            </TouchableOpacity>

            {/* Star Rating Component */}
            <StarRating
              rating={rating}
              onChange={setRating}
              enableHalfStar={true} // Full stars only
              color={COLORS.primary} // Gold color for stars
              emptyColor={COLORS.primary}
              starSize={47} // Adjust star size
              maxStars={5}
              // animationConfig={{
              //   scale:1.15,
              //   easing:Easing.elastic(1)
              // }}
            />

            <Text
              style={[
                mainStyles.fontInriaSansRegular,
                mainStyles.darkTextColor,
                mainStyles.fontSize20,
                {marginTop: 10},
              ]}>
              How Was Your Experience?
            </Text>
            <Text
              style={[
                mainStyles.fontNunitoMedium,
                mainStyles.lightTextColor,
                mainStyles.fontSize14,
              ]}>
              Give Us Rating and Your Review
            </Text>

            {/* Review Input & Button */}
            <View
              style={{
                width: '90%',
                position: 'absolute',
                bottom: verticalScale(20),
              }}>
              <TextInputComponent
                placeholder="Write Your Review..."
                value={review}
                onChangeText={txt => setReview(txt)}
                required={false}
              />

              <PrimaryButton
                title={'Share Your Experience'}
                disabled={!rating}
                onPress={handleAddRatingAndReview}
                style={undefined}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default AddRatingAndReview;
