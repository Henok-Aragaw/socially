import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useUserSync } from '@/hooks/use-user-async';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
    const [isRefetching, setIsRefetching ] = useState(false);
    
    useUserSync();
    
  return (
    <SafeAreaView>
      <View>
        <Ionicons />
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen