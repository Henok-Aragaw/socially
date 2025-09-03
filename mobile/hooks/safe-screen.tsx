import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Screen = {
  children: React.ReactNode
}


const SafeScreen = ({children}: Screen) => {
    const insets = useSafeAreaInsets();
  
  return (
    <View style={{paddingTop: insets.top}}>
     {children}
    </View>
  )
}

export default SafeScreen