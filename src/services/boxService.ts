import {API_ENDPOINTS} from '../constants/apiEndPoinst';
import {apiPost} from './apiService/apiService';

export const getBoxDetail = async (data?: FormData | Record<string, any>) => {
  try {
    const response = await apiPost(API_ENDPOINTS.BOX.GET_BOX_DETAILS, data);

    if (response?.success) {
      return response.data; // Return data if successful
    } else {
      return []; // Return an empty array if no data
    }
  } catch (error) {
    if (error instanceof Error)
      console.error('Error fetching box data:', error.message);
    throw error; // Propagate the error if needed
  }
};
