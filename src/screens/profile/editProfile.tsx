import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import SubHeader from '../../components/subHeader'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigationTypes';

type EditProfileNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;
type EditProfileRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

type EditProfileProps = {
  navigation: EditProfileNavigationProp;
  route: EditProfileRouteProp;
};
const EditProfile = ({navigation,route}:EditProfileProps) => {
  return (
    <View style={[mainStyles.container]}>
    <SubHeader title={'Account'} onPress={()=>navigation.goBack()} style={undefined}/>
        
    </View>
  )
}

export default EditProfile