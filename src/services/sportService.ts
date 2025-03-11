import {API_ENDPOINTS} from '../constants/apiEndPoinst';
import {apiPost} from './apiService/apiService';

export const getSportDetail = async () => {
  try {
    const response = await apiPost(API_ENDPOINTS.SPORTS.GET_SPORT_LIST);

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
