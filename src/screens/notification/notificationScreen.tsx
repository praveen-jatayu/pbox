import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import NoDataContainer from '../../components/noDataContainer';
import { AppStackScreenProps } from '../../navigation/navigationTypes';

// Dummy data for notifications
const notifications: string | ArrayLike<any> | null | undefined = [
  // {
  //   id: '1',
  //   profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  //   title: 'New Message',
  //   subtitle: 'You have received a new message from John.',
  //   date: 'Today',
  // },
  // {
  //   id: '2',
  //   profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
  //   title: 'Payment Received',
  //   subtitle: 'Your payment of $50 has been credited.',
  //   date: '2024-03-02',
  // },
  // {
  //   id: '3',
  //   profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
  //   title: 'Offer Alert',
  //   subtitle: 'Limited time offer! Get 20% off on your next booking.',
  //   date: '2024-03-01',
  // },
  // {
  //   id: '4',
  //   profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
  //   title: 'Account Update',
  //   subtitle: 'Your profile details have been updated successfully.',
  //   date: '2024-02-28',
  // },
];

const NotificationScreen:React.FC<AppStackScreenProps<"NotificationScreen">> = ({ navigation }) => {
  return (
    <View style={[mainStyles.container]}>
      <SubHeader title="Notification" onPress={() => navigation.goBack()} style={undefined} />
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
            <View style={styles.textContainer}>
              <Text style={[mainStyles.fontNunitoSemibold,mainStyles.darkTextColor,mainStyles.fontSize16]}>{item.title}</Text>
              <View style={[mainStyles.flexContainer]}>
              <Text style={[mainStyles.fontInriaSansRegular,mainStyles.lightTextColor,mainStyles.fontSize14,{width:'60%'}]} numberOfLines={2}>{item.subtitle}</Text>
              <Text style={[mainStyles.fontInriaSansRegular,mainStyles.darkTextColor,mainStyles.fontSize14]}>{item.date}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={notifications.length === 0 ? styles.emptyContainer : styles.flatListContent}
  ListEmptyComponent={
    <NoDataContainer style={undefined} noDataText={"No Notification received yet"} />
  }
/>
    
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  flatListContent: {
    padding: moderateScale(10),
  },
  emptyContainer: {
flex:1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(12),
    marginVertical: moderateVerticalScale(5),
    borderRadius: moderateScale(8),
    elevation: 2,
  },
  profilePic: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginRight: moderateScale(12),
  },
  textContainer: {
    flex: 1,
  },
  
});
