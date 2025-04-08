import { View, Text, Image, Pressable, StyleSheet,BackHandler } from 'react-native';
import React, { useContext, useEffect } from 'react';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import { icons } from '../../constants/Icon';
import profileStyles from '../../assets/styles/profileStyles';
import { useAuth } from '../../customHooks/useAuth';
import { AppStackScreenProps } from '../../navigation/navigationTypes';
import MainHeader from '../../components/mainHeader';



const ProfileScreen:React.FC<AppStackScreenProps<"ProfileScreen">> = ({ navigation,route }) => {
  
  const{logout,userInfo}=useAuth()

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of going back
      e.preventDefault();

      // Navigate explicitly to 'My Lorry'
      navigation.navigate('BottomNav');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={[mainStyles.container]}>
      <MainHeader
        title={'Account'}
        headerType='sub'
        onPressBack={() => navigation.navigate('BottomNav')} isFetchingLocation={false} location={[]}    />
      <Text onPress={()=>navigation.navigate('EditProfile')}>edit Profile</Text>
    </View>
  );
};

export default ProfileScreen;


