import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import CustomHeader from '../../components/customHeader'
import { scale, verticalScale } from 'react-native-size-matters'

const ClientReview = ({navigation}) => {
  return (
    <View style={mainStyles.container}>
    <CustomHeader title={'What Client Says'} onPress={() => navigation.goBack()} style={{paddingTop:verticalScale(40),height:verticalScale(80),paddingRight:scale(30)}} />

     {/* <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" /> */}
      
    
      </View>
  )
}

export default ClientReview