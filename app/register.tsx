import { Button, Card, Paper, Text, TextField, HStack } from '@/src/components'
import { ACCESS_TOKEN } from '@/src/lib/async-storage/keys'
import { AsyncStorageService } from '@/src/lib/async-storage/storage'
import { useRegisterMutation } from '@/src/stores'
import { useUserActions } from '@/src/stores/userStore/userStore'
import { useState } from 'react'
import { VStack } from '../src/components/ui/Stack/VStack'
import { useRouter } from 'expo-router'
import { Pressable } from 'react-native'

const Register = () => {
    const [authData, setAuthData] = useState<{ login: string; password: string; username: string }>({
        login: '',
        password: '',
        username: '',
    })
    const [register, { isLoading, isError }] = useRegisterMutation()
    const { setUser } = useUserActions()
    const router = useRouter()

    const onSubmit = async () => {
        const { data } = await register({
            email: authData.login,
            password: authData.password,
            username: authData.username,
        })
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
                        Register
                    </Text>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text size={'xl'} bold style={{ marginBottom: 20, opacity: 0.3 }}>
                            Login
                        </Text>
                    </Pressable>
                </HStack>
                <VStack align="flex-start" justify="center" gap={10}>
                    <TextField
                        max
                        error={isError ? 'Invalid something' : undefined}
                        label="Username"
                        onChange={(username) => setAuthData((prev) => ({ ...prev, username }))}
                        placeholder="Username"
                        value={authData.username}
                    />
                    <TextField
                        max
                        error={isError ? 'Invalid something' : undefined}
                        label="Login"
                        onChange={(login) => setAuthData((prev) => ({ ...prev, login }))}
                        placeholder="Login"
                        value={authData.login}
                    />
                    <TextField
                        max
                        error={isError ? 'Invalid something' : undefined}
                        label="Password"
                        onChange={(password) => setAuthData((prev) => ({ ...prev, password }))}
                        value={authData.password}
                        placeholder="Password"
                    />
                    <Button max loading={isLoading} onPress={onSubmit}>
                        Submit
                    </Button>
                </VStack>
            </Card>
        </Paper>
    )
}

export default Register
