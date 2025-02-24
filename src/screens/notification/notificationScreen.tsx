import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import SubHeader from '../../components/subHeader'

const NotificationScreen = ({navigation}) => {
  return (
    <View style={[mainStyles.container]}>
     <SubHeader title={'Notification'} onPress={()=>navigation.goBack()} style={undefined}/>
    </View>
  )
}

export default NotificationScreen