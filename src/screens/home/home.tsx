import { View, Text } from 'react-native'
import React from 'react'
import HomeCustomHeader from './components/homeCustomHeader'
import BottomModal from '../../components/bottomModal'

const Home = () => {
  return (
    <View>
      <HomeCustomHeader navigation={undefined}/>
      <BottomModal/>
    </View>
  )
}

export default Home