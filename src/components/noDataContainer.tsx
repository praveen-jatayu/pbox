import { View, Text, Image } from 'react-native'
import React from 'react'
import mainStyles from '../assets/styles/mainStyles'
import { images } from '../constants/image'
import { scale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../constants/fontConstant'
import { COLORS } from '../constants/colorConstant'

const NoDataContainer = () => {
  return (
    <View style={[mainStyles.container,{justifyContent:'center',alignItems:'center'}]}>
     <Image source={images.noData1} style={{height:verticalScale(200),width:scale(200)}}/>
     
        <Text style={{fontFamily:FONTS.nunitoMedium,fontSize:scale(19),color:COLORS.darkText}}> Data Not found!!..</Text>
        <Text style={{fontFamily:FONTS.nunitoMedium,fontSize:scale(14),color:COLORS.lightText,textAlign:'center'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa necessitatibus fuga sunt reprehenderit deleniti odit soluta totam </Text>
    
    </View>
  )
}

export default NoDataContainer