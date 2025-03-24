import { API_ENDPOINTS } from "../constants/apiEndPoinst"
import { apiPost } from "./apiService/apiService"

export  const updateReviewAndRating=async(formData)=>{
  try{
  const response=await apiPost(API_ENDPOINTS.REVIEW_AND_RATING.UPDATE_BOOKING_RATING_REVIEW,formData)
         if (response.success) {
             return {success:true,message:response.message} // Return the vehicle data
         } else {
             return { success: false, message: response.message };
         }
       }
       catch (error) {
         console.error('Error adding booking :', error.message);
         throw error; // Optional: Propagate the error if needed
       }
}

export const getBookingRatingReview = async (data) => {
  try {
    const response = await apiPost(API_ENDPOINTS.REVIEW_AND_RATING.GET_BOOKING_RATING_REVIEW,data);

    if (response.success) {
      return response.data
    
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching sports data:', error.message);
    throw error; // Propagate the error if needed
  }
};