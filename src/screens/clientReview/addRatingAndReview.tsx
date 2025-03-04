import { View, Text, Easing, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import PrimaryButton from '../../components/primaryButton'
import { verticalScale } from 'react-native-size-matters'
import TextInputComponent from '../../components/textInputComponent'
import StarRating from 'react-native-star-rating-widget';
import { COLORS } from '../../constants/color'


const AddRatingAndReview = () => {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0) // State to store user rating
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS==='ios'?'padding':null}
style={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={[mainStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            
            {/* Star Rating Component */}
            <StarRating 
              rating={rating}
              onChange={setRating}
              enableHalfStar={false} // Full stars only
              color={COLORS.primary} // Gold color for stars
              emptyColor={COLORS.primary}
              starSize={47} // Adjust star size
              maxStars={5}
              animationConfig={{
                scale:1.15,
                easing:Easing.elastic(1.2)
              }}
            />

            <Text style={[mainStyles.fontInriaSansRegular, mainStyles.darkTextColor, mainStyles.fontSize20, { marginTop: 10 }]}>
              How Was Your Experience?
            </Text>
            <Text style={[mainStyles.fontNunitoMedium, mainStyles.lightTextColor, mainStyles.fontSize14]}>
              Give Us Rating and Your Review
            </Text>

            {/* Review Input & Button */}
            <View style={{ width: '90%', position:'absolute',bottom:verticalScale(20)  }}>
              <TextInputComponent
                placeholder="Write Your Review..."
                value={review}
                onChangeText={(txt) => setReview(txt)}
                required={false}
              />

              <PrimaryButton 
                title={'Share Your Experience'}
                disabled={!rating}
                onPress={() => console.log('Rating:', rating, 'Review:', review)} style={undefined}              />
            </View>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default AddRatingAndReview
