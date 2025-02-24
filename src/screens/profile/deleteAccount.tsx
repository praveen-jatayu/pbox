import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import SubHeader from '../../components/subHeader'

const DeleteAccount = ({navigation}) => {
  return (
    <View style={[mainStyles.container]}>
      <SubHeader title={'Delete Account'} onPress={()=>navigation.goBack()} style={undefined}/>
    </View>
  )
}

export default DeleteAccount