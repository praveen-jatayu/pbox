import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import SearchInput from '../../components/searchInput'
import { scale } from 'react-native-size-matters'
import SubHeader from '../../components/subHeader'

const SelectCity = ({navigation}) => {
  return (
    <View style={mainStyles.container}>
        <SubHeader title={'Select City'} onPress={() => navigation.goBack()} style={undefined}  />
          <View style={{padding:scale(12)}}>
          <SearchInput value={undefined} onChangeText={undefined} onPress={undefined}/>
        
          
          </View>
          </View>

  )
}

export default SelectCity