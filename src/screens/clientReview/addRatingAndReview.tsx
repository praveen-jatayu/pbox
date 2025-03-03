import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import PrimaryButton from '../../components/primaryButton'
import { verticalScale } from 'react-native-size-matters'

const AddRatingAndReview = () => {
  return (
    <View style={[mainStyles.container]}>
   <PrimaryButton title={'Share Your Experience'} disabled={undefined} onPress={undefined} style={{position:'absolute',bottom:verticalScale(10),width:'90%'}}/>
    </View>
  )
}

export default AddRatingAndReview