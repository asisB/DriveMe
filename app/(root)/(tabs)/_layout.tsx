import { Tabs } from 'expo-router'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const TabIcon = ({ focused, source }: { focused: boolean, source: ImageSourcePropType }) => (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
        <View className={`w-10 h-10 rounded-full justify-center items-center ${focused ? "bg-general-400" : ""}`    }>
            <Image source={source} tintColor="white"  resizeMode='contain' className='w-6 h-6' />
        </View>
    </View>
)

const Layout = () => {
    return (
        <Tabs initialRouteName='index'
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#222830",
                    borderRadius: 50,
                    paddingBottom: 0,
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 20,
                    height: 80,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute",
                }
            }}>
            <Tabs.Screen name='home' options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.home} />

                ),
            }}
            />
            <Tabs.Screen name='rides' options={{
                title: "Rides",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.list} />

                ),
            }}
            />
            <Tabs.Screen name='chat' options={{
                title: "Chat",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.chat} />

                ),
            }}
            />
            <Tabs.Screen name='profile' options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.profile} />

                ),
            }}
            />
        </Tabs>
    )
}

export default Layout