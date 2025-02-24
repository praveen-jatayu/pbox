import { View, Text, Image } from 'react-native'
import React from 'react'
import mainStyles from '../assets/styles/mainStyles'
import { images } from '../constants/image'
import { scale, verticalScale } from 'react-native-size-matters'

const NoDataContainer = ({style}) => {
  return (
    <View style={[mainStyles.container,{justifyContent:'center',alignItems:'center'},style]}>
     <Image source={images.noData1} style={{height:verticalScale(200),width:scale(200)}}/>
     
        <Text style={[mainStyles.fontNunitoMedium,mainStyles.fontSize18,mainStyles.darkTextColor]}> Data Not found!!..</Text>
        
        <Text style={[mainStyles.fontNunitoMedium,mainStyles.fontSize14,mainStyles.lightTextColor,{textAlign:'center'}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa necessitatibus fuga sunt reprehenderit deleniti odit soluta totam </Text>
    
    </View>
  )
}

export default NoDataContainer