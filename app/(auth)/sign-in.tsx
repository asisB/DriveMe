import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { images, icons } from "@/constants"
import InputField from "@/components/InputField"
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import OAuth from '@/components/OAuth'

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const onSignInPress = async() => {
    console.log(form)
  } 

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className='absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5'>Welcome Back</Text>
        </View>
        <View className='p-5'>
            <InputField 
            label="Email" 
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
            <InputField 
            label="Password" 
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton title="Sign In"  onPress={onSignInPress} className="mt-8"/>

          <OAuth />
          <Link href="/sign-up" className='mt-6 text-md text-general-200 text-center'>
            <Text>Don't have an account?</Text>
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
      </View>
      </View>

    </ScrollView>
  )
}

export default SignIn