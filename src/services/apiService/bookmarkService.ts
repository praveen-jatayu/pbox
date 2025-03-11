import { API_ENDPOINTS } from "../../constants/apiEndPoinst";
import { apiPost } from "./apiService";

export  const updateBookmark=async(formData)=>{
    console.log('book',formData)
    try{
     
    const response=await apiPost(API_ENDPOINTS.BOOKMARK.UPDATE_BOOKMARK,formData)
       
           if (response.success) {
               return {success:true,message:response.message} // Return the vehicle data
           } else {
               return { success: false, message: response.message };
           }
         }
         catch (error) {
           console.error('Error updating book Mark :', error.message);
           throw error; // Optional: Propagate the error if needed
         }
}