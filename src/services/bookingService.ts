import {API_ENDPOINTS} from '../constants/apiEndPoinst';
import {SelectedSlotType} from '../screens/types/slot';
import {apiPost} from './apiService/apiService';

interface bookingData {
  box_id: number;
  total_amount: string;
  selectedSlots: SelectedSlotType;
}

export const getCourtByBoxId = async (data: FormData) => {
  try {
    const response = await apiPost(
      API_ENDPOINTS.BOOKING.GET_BOX_BY_COURT,
      data,
    );

    if (response?.success) {
      return response.data; // Return data if successful
    } else {
      return []; // Return an empty array if no data
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching box data:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error;
  }
};
export const getSlotDetailByDate = async (data: FormData) => {
  try {
    const response = await apiPost(
      API_ENDPOINTS.BOOKING.GET_BOX_COURT_DATE_BY_SLOT,
      data,
    );

    console.log('eeeee', response);
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
export const addBooking = async (formData: bookingData) => {
  try {
    const response = await apiPost(API_ENDPOINTS.BOOKING.ADD_BOOKING, formData);
    console.log('eeee', response);
    if (response.success) {
      return {success: true, message: response.message}; // Return the vehicle data
    } else {
      return {success: false, message: response.message};
    }
  } catch (error) {
    if (error instanceof Error)
      console.error('Error adding booking :', error.message);
    throw error; // Optional: Propagate the error if needed
  }
};
export const getBookingList = async (data: FormData) => {
  try {
    const response = await apiPost(
      API_ENDPOINTS.BOOKING.GET_BOOKING_LIST,
      data,
    );

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
