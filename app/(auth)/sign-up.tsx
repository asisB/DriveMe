import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { images, icons } from "@/constants"
import InputField from "@/components/InputField"
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import { fetchAPI } from '@/lib/fetch'

const SignUp = () => {
  const { signUp, isLoaded, setActive } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  
  const [verification, setVerification] = useState({
    state: 'default', 
    error: '', 
    code: ""
  }
    
  )

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({ 
        ...verification,
        state: 'pending', 
      })

    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code, 
      })

      if (completeSignUp.status === 'complete') {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({
          ...verification,
          state: 'success',
        })
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: "Verification code is incorrect",
        })
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors[0].longMessage,
      })
    }
  }

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className='absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5'>Create Your Account</Text>
        </View>
        <View className='p-5'>
          <InputField 
            label="Name" 
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
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

          <CustomButton title="Sign Up"  onPress={onSignUpPress} className="mt-8"/>

          <OAuth />
          <Link href="/sign-in" className='mt-6 text-md text-general-200 text-center'>
            <Text>Already have an account?</Text>
            <Text className='text-primary-500'>Log In</Text>
          </Link>
      </View>
      <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={() => {if(verification.state === "success") setShowSuccessModal(true)}}>
        <View className="bg-white px-7 py-9 rounded min-h-[300px]">
          <Text className='text-2xl font-JakartaBold mb-2'>Email Verification</Text>
          <Text className="font-Jakarta mb-5">We've sent a verification code to {form.email}</Text>
          <InputField 
          label="Verification Code"
          icon={icons.lock}
          placeholder="12345"
          value={verification.code}
          keyboardType='numeric'
          onChangeText={(text) => setVerification({ ...verification, code: text })}
          />
          {verification.error &&
           <Text className="text-red-500 mt-1 text-sm">{verification.error}</Text>}
           <CustomButton title="Verify Email" onPress={onPressVerify} className="mt-5 bg-success-500" />
        </View>
        </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className='bg-white px-7 py-9 rounded min-h -[300px]'>
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className='text-3xl font-JakartaBold text-center'>Email Verified</Text>
            <Text className='text-center text-base text-gray-400 font-Jakarta mt-2'>You have suceessfully verified your account</Text>

            <CustomButton title="Home" onPress={() => {setShowSuccessModal(false); router.push('/(root)/(tabs)/home')}} className="mt-5" />
        </View>
      </ReactNativeModal>

      </View>

    </ScrollView>
  )
}

export default SignUp