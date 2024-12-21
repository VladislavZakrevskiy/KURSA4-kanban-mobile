import { Button, Card, HStack, Paper, Text, TextField, VStack } from '@/src/components'
import { ACCESS_TOKEN } from '@/src/lib/async-storage/keys'
import { AsyncStorageService } from '@/src/lib/async-storage/storage'
import { useLoginMutation } from '@/src/stores'
import { useUserActions } from '@/src/stores/userStore/userStore'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable } from 'react-native'

const Login = () => {
    const [authData, setAuthData] = useState<{ username: string; password: string }>({ username: '', password: '' })
    const [login, { isLoading, isError }] = useLoginMutation()
    const { setUser } = useUserActions()
    const router = useRouter()

    const onSubmit = async () => {
        const { data } = await login({ username: authData.username, password: authData.password })
        if (data) {
            setUser(data.user)
            await AsyncStorageService.setItem(ACCESS_TOKEN, data.access_token)
            router.push('/')
        }
    }

    return (
        <Paper style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ padding: 20, minWidth: '90%' }}>
                <HStack justify="space-between">
                    <Text size={'xl'} bold style={{ marginBottom: 20 }}>
                        Login
                    </Text>
                    <Pressable onPress={() => router.push('/register')}>
                        <Text size={'xl'} bold style={{ marginBottom: 20, opacity: 0.3 }}>
                            Register
                        </Text>
                    </Pressable>
                </HStack>
                <VStack align="stretch" style={{ minWidth: '90%' }} gap={10} max>
                    <TextField
                        type="email-address"
                        max
                        error={isError ? 'Invalid login or password' : undefined}
                        label="Login"
                        onChange={(username) => setAuthData((prev) => ({ ...prev, username }))}
                        placeholder="Login"
                        value={authData.username}
                    />
                    <TextField
                        type="visible-password"
                        max
                        error={isError ? 'Invalid login or password' : undefined}
                        label="Password"
                        onChange={(password) => setAuthData((prev) => ({ ...prev, password }))}
                        value={authData.password}
                        placeholder="Password"
                    />
                    <Button loading={isLoading} onPress={onSubmit}>
                        Submit
                    </Button>
                </VStack>
            </Card>
        </Paper>
    )
}

export default Login
