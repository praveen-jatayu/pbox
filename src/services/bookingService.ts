import {API_ENDPOINTS} from '../constants/apiEndPoinst';
import {apiPost} from './apiService/apiService';

export const getCourtByBoxId = async (data) => {
  
  try {
    const response = await apiPost(API_ENDPOINTS.BOOKING.GET_BOX_BY_COURT, data);


    if (response?.success) {
      return response.data; // Return data if successful
    } else {
      return []; // Return an empty array if no data
    }
  } catch (error) {
    console.error('Error fetching box data:', error.message);
    throw error; // Propagate the error if needed
  }
};
