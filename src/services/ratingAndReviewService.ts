import { API_ENDPOINTS } from "../constants/apiEndPoinst"
import { apiPost } from "./apiService/apiService"

export  const updateReviewAndRating=async(formData)=>{
  console.log('REVIEW',formData)
  try{
   
  const response=await apiPost(API_ENDPOINTS.REVIEW_AND_RATING.UPDATE_BOOKING_RATING_REVIEW,formData)
     console.log('eeee',response)
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