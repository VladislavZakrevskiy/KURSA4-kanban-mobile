import { Header } from '@/src/components'
import { StorageProvider } from '@/src/components/providers/StorageProvider/StorageProvider'
import { StoreProvider } from '@/src/stores/StoreProvider'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function RootLayout() {
    return (
        <StoreProvider>
            <StorageProvider>
                <Stack
                    initialRouteName="/"
                    screenOptions={{
                        header: Header,
                        gestureEnabled: true,
                        animation: 'fade',
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="design/index" />
                    <Stack.Screen name="[id]" />
                    <Stack.Screen name="login" options={{ header: () => <View></View> }} />
                    <Stack.Screen name="register" options={{ header: () => <View></View> }} />
                </Stack>
            </StorageProvider>
        </StoreProvider>
    )
}
