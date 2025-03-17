import { API_ENDPOINTS } from "../../constants/apiEndPoinst"
import { apiPost } from "./apiService"



export  const updateProfile=async(formData)=>{
    console.log('profile',formData)
    try{
     
    const response=await apiPost(API_ENDPOINTS.USER.UPDATE_PROFILE,formData)
       console.log('eeee',response)
           if (response.success) {
               return {success:true,message:response.message,updatedData:response.data} 
           } else {
               return { success: false, message: response.message };
           }
         }
         catch (error) {
           console.error('Error updating profile  :', error.message);
           throw error; // Optional: Propagate the error if needed
         }
}