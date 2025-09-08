import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { useCurrentUser } from '@/hooks/use-current-user'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SignOutButton from '@/components/sign-out-button';
import { Feather } from '@expo/vector-icons';
import { format } from "date-fns"
import { useProfile } from '@/hooks/user-profile';
import { usePosts } from '@/hooks/use-posts';
import PostsList from '@/components/post-list';
import EditProfile from '@/components/edit-profile';


const Profile = () => {
    const { currentUser, isLoading } = useCurrentUser();
    const insets = useSafeAreaInsets();

    const {
        posts,
        refetch:refetchPosts,
        isLoading:isRefetching
    } = usePosts();
    const {
        isEditModalVisible,
        openEditModal,
        closeEditModal,
        formData,
        saveProfile,
        updateFormField,
        isUpdating,
        refetch: refetchProfile
    } = useProfile();

    if(isLoading) {
        return (
            <View className='flex-1 bg-white items-center justify-center'>
                <ActivityIndicator size={'large'} color={'#1DA1F2'} />
            </View>
        )
    }

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top']}>
        <View className='flex-row items-center justify-between px-4 py-3 border-b border-b-gray-300'>
            <View>
                <Text className='text-xl font-bold text-gray-900'>
                    {currentUser.firstName} {currentUser.lastName}
                </Text>
                <Text>Posts</Text>
            </View>
            <SignOutButton />
        </View>
        <ScrollView
         className='flex-1'
         contentContainerStyle={{
            paddingBottom: 100 + insets.bottom
         }}
         showsVerticalScrollIndicator={false}
         refreshControl={
            <RefreshControl
             refreshing={isRefetching}
             onRefresh={() => {
                refetchProfile();
                refetchPosts();
            }}
            tintColor={'#1DA1F2'}
            />
         }
        >
            <Image
            source={{
                uri: currentUser.bannerImage || "https://images.unsplash.com/photo-1744138207230-9b5f9bd09557?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
            }}
            className='w-full h-48'
            resizeMode='cover'
            />
            <View className='px-4 pb-4 border-b border-gray-100'>
                <View className='flex-row justify-between items-end -mt-16 mb-4'>
                    <Image
                    source={{uri: currentUser.profilePicture}}
                    className='w-28 h-28  rounded-full border-4 border-white'
                    />
                    <TouchableOpacity
                    className='border border-gray-300 px-6 py-2 rounded-full'
                    onPress={openEditModal}
                    >
                        <Text className='font-semibold text-gray-900'>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className='mb-4'>
                    <View className='flex-row items-center mb-1'>
                        <Text className='text-xl font-bold text-gray-900 mr-1'>{currentUser.firstName} {currentUser.lastName}</Text>
                        <Feather name='check-circle' size={20} color='#1DA1F2' />
                    </View>
                    <Text className='text-gray-500 mb-2'>@{currentUser.username}</Text>
                    <Text className='text-gray-900 mb-3'>{currentUser.bio}</Text>

                    <View className='flex-row items-center mb-3'>
                        <Feather name='map-pin' size={20} color={'#657786'}/>
                        <Text className='text-gray-500 ml-2'>{currentUser.location}</Text>
                    </View>

                    <View className='flex-row items-center mb-3'>
                        <Feather name='calendar' size={16} color={'#657786'}/>
                        <Text>
                            Joined {format(new Date(currentUser.createdAt), 'MMMM yyyy')}
                        </Text>
                    </View>

                    <View className='flex-row'>
                        <TouchableOpacity className='mr-6'>
                            <Text className='text-gray-900'>
                                <Text className='font-bold'>
                                 {currentUser.following?.length}
                                </Text>
                                   <Text className='text-gray-500'>
                                        Following
                                    </Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className='text-gray-900'>
                                <Text className='font-bold'>{currentUser.followers?.length}</Text>
                                <Text className='text-gray-500'>Followers</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <PostsList username={currentUser?.username}/>
        </ScrollView>
        <EditProfile
         isVisible={isEditModalVisible}
         onClose={closeEditModal}
         formData={formData}
         saveProfile={saveProfile}
         updateFormField={updateFormField}
         isUpdating={isUpdating}
        />
    </SafeAreaView>
  )
}

export default Profile