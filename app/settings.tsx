import React from 'react'
import { Button, HStack, Paper, Text, ThemeSwitcher, VStack } from '@/src/components'
import { AuthProvider } from '@/src/components/providers/AuthProvider/AuthProvider'
import { useRouter } from 'expo-router'

export default function settings() {
    const router = useRouter()

    return (
        <AuthProvider>
            <Paper style={{ padding: 20, flex: 1 }}>
                <VStack gap={12}>
                    <HStack gap={12} align="center">
                        <Text bold>Theme</Text>
                        <ThemeSwitcher />
                    </HStack>

                    <HStack gap={12} align="center">
                        <Text bold>Theme</Text>
                        <Button onPress={() => router.push('/design')}>To Disign</Button>
                    </HStack>
                </VStack>
            </Paper>
        </AuthProvider>
    )
}
