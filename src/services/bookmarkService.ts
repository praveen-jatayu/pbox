import { API_ENDPOINTS } from "../constants/apiEndPoinst"
import { apiPost } from "./apiService/apiService"

interface UpdateBookmarkRequest {
  boxId: string;   
  isBookmark: boolean;
}


export  const updateBookmark=async(formData:UpdateBookmarkRequest):Promise<{success:boolean;message:string}>=>{
    try{
     
    const response=await apiPost(API_ENDPOINTS.BOOKMARK.UPDATE_BOOKMARK,formData)

           if (response.success) {
               return {success:true,message:response.message} // Return the vehicle data
           } else {
               return { success: false, message: response.message };
           }
         }
         catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error updating bookmark:", error.message);
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
}