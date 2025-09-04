import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useUserSync } from '@/hooks/use-user-async';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SignOutButton from '@/components/sign-out-button';
import PostComposer from '@/components/post-conposer';

const HomeScreen = () => {
    const [isRefetching, setIsRefetching ] = useState(false);
    
    useUserSync();
    
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-row  justify-between items-center px-4 py-3 border-b border-b-gray-100'>
        <Ionicons name='logo-twitter' size={24} color='#1DA1F2' />
        <Text className='text-xl font-bold text-gray-900'>Home</Text>
        <SignOutButton />
      </View>

      <ScrollView>
        <PostComposer />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen