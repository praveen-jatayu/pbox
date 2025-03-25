import {API_ENDPOINTS} from '../constants/apiEndPoinst';
import {apiPost} from './apiService/apiService';


interface Sport {
  id: number;
  name: string;
  image: string;
  icon: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}




export const getSportDetail = async ():Promise<Sport[]> => {
  try {
    const response = await apiPost(API_ENDPOINTS.SPORTS.GET_SPORT_LIST);

    if (response.success) {
      return response.data
    
    } else {
      return [];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching sports data:", error.message);
    } 
    throw error; // Propagate the error if needed
  }
};
