import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ride } from '@/types/type'
import { icons } from '@/constants'
import { formatDate } from '@/lib/utils'

const RideCard = ({ ride: {
    destination_longitude,
    destination_latitude,
    origin_address, destination_address,
    created_at, ride_time,
    driver,
    payment_status, fare_price

} }: { ride: Ride }) => {
    return (
        <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
            <View className="flex flex-col items-start justify-center p-3">
                <View className="flex flex-row items-center justify-between">
                    <Image
                        source={{
                            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
                        }}
                        className="w-[80px] h-[90px] rounded-lg"
                    />

                    <View className="flex flex-col mx-5 gap-y-5 flex-1">
                        <View className="flex flex-row items-center gap-x-2">
                            <Image source={icons.to} className="w-5 h-5" />
                            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                                {origin_address}
                            </Text>
                        </View>

                        <View className="flex flex-row items-center gap-x-2">
                            <Image source={icons.point} className="w-5 h-5" />
                            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                                {destination_address}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className='flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center'>
                    <View className="flex flex-row items-center w-full justify-between mb-5">
                        <Text className="text-md font-Jakarta-Regular text-gray-500" numberOfLines={1}>
                            Date & Time
                        </Text>
                        <Text className="text-md font-Jakarta-Bold flex-1 text-right ml-2" numberOfLines={1}>
                            {formatDate(String(created_at))}, {formatDate(String(ride_time))}
                        </Text>
                    </View>

                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className="text-md font-Jakarta-Regular text-gray-500" numberOfLines={1}>
                            Driver
                        </Text>
                        <Text className="text-md font-Jakarta-Bold flex-1 text-right ml-2" numberOfLines={1}>
                            {driver?.first_name} {driver?.last_name}
                        </Text>
                    </View>

                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className="text-md font-Jakarta-Regular text-gray-500" numberOfLines={1}>
                            Car Seats
                        </Text>
                        <Text className="text-md font-Jakarta-Bold flex-1 text-right ml-2" numberOfLines={1}>
                            {driver?.car_seats}
                        </Text>
                    </View>

                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className={`text-md font-Jakarta-Regular capitalize ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`} numberOfLines={1}>
                            Payment Status
                        </Text>
                        <Text className="text-md font-Jakarta-Bold flex-1 text-right ml-2" numberOfLines={1}>
                            {payment_status}
                        </Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default RideCard;