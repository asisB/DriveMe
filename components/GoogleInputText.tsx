import { View, Text } from 'react-native'
import React from 'react'

const GoogleInputText = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress
}) => {

    return (
        <View className={`flex flex-row items-center justify-center relative z-50 rounded ${containerStyle} mb-5`}>
            <Text>Search</Text>
        </View>
    )
}

export default GoogleInputText