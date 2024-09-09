import { View, Text, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboardingData } from '../constants';
import { Image } from 'react-native';
import CustomButton from '@/components/CustomButton';

const Onboarding = () => {

    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastPage = activeIndex === onboardingData.length - 1;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row justify-end p-5">
                <TouchableOpacity onPress={() => {
                    router.replace('/(auth)/sign-up');
                }} >
                    <Text className='text-black text-md font-JakartaBold'>Skip</Text>
                </TouchableOpacity>
            </View>

            <Swiper ref={swiperRef}
                loop={false}
                dot={<View className="w-[32] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
                activeDot={<View className="w-[32] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboardingData.map((item) => (
                    <View key={item.id} className='flex-1 items-center justify-center p-5'>
                        <Image
                            source={item.image}
                            className='w-full h-[300px]'
                            resizeMode='contain'
                        />
                        <View className='flex flex-row items-center justify-center w-full mt-10'>
                            <Text className='text-black text-3xl font-JakartaBold mx-10, text-center'>{item.title}</Text>
                        </View>
                        <View>
                            <Text className='text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3'>{item.description}</Text>
                        </View>

                    </View>

                ))}
            </Swiper>
            <View className='items-center'>
                <CustomButton
                    title={isLastPage ? "Get Started" : "Next"}
                    onPress={() => isLastPage ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(-1)}
                    className='w-11/12 mt-10'

                />
            </View>

        </SafeAreaView>
    )
}

export default Onboarding;