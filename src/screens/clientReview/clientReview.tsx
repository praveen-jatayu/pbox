import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import { scale, verticalScale } from 'react-native-size-matters'
import SubHeader from '../../components/subHeader'



const ClientReview = ({navigation}) => {
  return (
    <View style={mainStyles.container}>
    <SubHeader title={'What Client Says'} onPress={() => navigation.goBack()} style={{paddingTop:verticalScale(40),height:verticalScale(80),paddingRight:scale(30)}} />

     {/* <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" /> */}
      
    
      </View>
  )
}

export default ClientReview