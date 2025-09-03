import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useUserSync } from '@/hooks/use-user-async';

const HomeScreen = () => {
    const [isRefetching, setIsRefetching ] = useState(false);
    
    useUserSync();
    
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default HomeScreen