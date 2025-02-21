import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../assets/styles/mainStyles'
import CustomHeader from '../../components/customHeader'
import SearchInput from '../../components/searchInput'
import { scale } from 'react-native-size-matters'
import NoDataContainer from '../../components/noDataContainer'

const SelectCity = ({navigation}) => {
  return (
    <View style={mainStyles.container}>
        <CustomHeader title={'Select City'} onPress={() => navigation.goBack()}  />
          <View style={{padding:scale(12)}}>
          <SearchInput value={undefined} onChangeText={undefined} onPress={undefined}/>
        
          
          </View>
          </View>

  )
}

export default SelectCity