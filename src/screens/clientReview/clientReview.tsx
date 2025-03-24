import { View, Text, StatusBar, FlatList, RefreshControl, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import { scale, verticalScale } from 'react-native-size-matters';
import SubHeader from '../../components/subHeader';
import boxDetailStyles from '../../assets/styles/boxDetailStyles';
import { images } from '../../constants/image';
import { showToast } from '../../components/toastMessage';
import { getBookingRatingReview } from '../../services/ratingAndReviewService';
import { COLORS } from '../../constants/color';

const ClientReview = ({ navigation, route }) => {
  const { boxDetail } = route.params; // ✅ Fix: Destructure `boxDetail` properly
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch Reviews
  const fetchReviews = async () => {
    setRefreshing(true); // ✅ Start refreshing state
    setIsLoading(true);  // ✅ Start loading state

    const formData = new FormData();
    formData.append('box_id', boxDetail?.id);

    try {
      const response = await getBookingRatingReview(formData);
      
      if (Array.isArray(response)) { // ✅ Ensure response is an array
        console.log('Review Data:', response);
        setReviewData(response);
      } else {
        console.log('No reviews found');
        setReviewData([]); // ✅ Set an empty array to prevent errors
      }
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
      showToast('error', 'Failed to fetch reviews');
    } finally {
      setIsLoading(false);  // ✅ Stop loading state
      setRefreshing(false); // ✅ Stop refreshing state
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Render Each Review
  const renderItem = ({ item }) => (
    <View key={item?.id} style={[boxDetailStyles.reviewContainer, mainStyles.secondaryBackgroundColor, mainStyles.dropShadowEffect, { elevation: 3 ,width:'95%',alignSelf:'center'}]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(20) }}>
        <Image 
          source={item?.get_selected_user?.profile_pic ? { uri: item.get_selected_user.profile_pic } : images.profile} 
          style={boxDetailStyles.profilePic} 
        />
        <View style={{width:'75%'}}>
          <Text style={[mainStyles.fontNunitoMedium, mainStyles.darkTextColor, mainStyles.fontSize16]}>
            {item?.get_selected_user?.name || 'Anonymous'}
          </Text>
          <View style={[mainStyles.flexContainer]}>
            <Text style={[mainStyles.fontNunitoMedium, mainStyles.fontSize14, mainStyles.lightTextColor]} numberOfLines={2}>
              {item?.review || 'No review available'}
            </Text>
            <Text style={[mainStyles.fontNunitoMedium, mainStyles.fontSize12, mainStyles.lightTextColor]}>
              {item?.booking_date || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Show when no data
  const renderEmptyComponent = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(50) }}>
      <Text style={[mainStyles.fontNunitoMedium, mainStyles.fontSize16, mainStyles.lightTextColor]}>
        No reviews available.
      </Text>
    </View>
  );

  return (
    <View style={mainStyles.container}>
      <SubHeader title={'What Client Says'} onPress={() => navigation.goBack()} style={{ paddingTop: verticalScale(40), height: verticalScale(80), gap: scale(70) }} />
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
<View style={{paddingHorizontal:scale(10)}}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: verticalScale(50) }} />
      ) : (
        <FlatList
          data={reviewData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchReviews} />}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        />
      )}
      </View>
    </View>
  );
};

export default ClientReview;
