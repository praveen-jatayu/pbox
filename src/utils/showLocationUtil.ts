import {Alert, Linking} from 'react-native';

export const handleShowLocation = (
  latitude?: string,
  longitude?: string,
): void => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open maps:', err),
    );
  } else {
    Alert.alert(
      'Location not available',
      'Latitude and longitude data is missing.',
    );
  }
};
