import { View, Text, ActivityIndicator } from 'react-native'
import React, { FC, ReactNode, useEffect } from 'react'
import { useUserActions } from '@/src/stores/userStore/userStore'
import { usePathname, useRouter } from 'expo-router'
import { useLazyGetProfileQuery } from '@/src/stores'
import { AsyncStorageService } from '@/src/lib/async-storage/storage'
import { ACCESS_TOKEN } from '@/src/lib/async-storage/keys'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { Paper } from '../../ui/Paper/Paper'

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const { isLoading, user } = useAppSelector((state) => state.user)
    const { setIsLoading, setUser } = useUserActions()
    const pathname = usePathname()
    const router = useRouter()
    const [getMe, { isLoading: isUserLoading }] = useLazyGetProfileQuery()

    useEffect(() => {
        const getAccessToken = async () => {
            if (pathname === 'login' || pathname === 'register' || user) {
                return
            }
            setIsLoading(true)
            const token = await AsyncStorageService.getItem(ACCESS_TOKEN)
            if (token) {
                await AsyncStorageService.setItem(ACCESS_TOKEN, token)
                const { data } = await getMe()
                if (data) {
                    setUser(data)
                } else {
                    router.push('/login')
                    await AsyncStorageService.removeItem(ACCESS_TOKEN)
                }
            } else {
                router.push('/login')
            }
            setIsLoading(false)
        }
        getAccessToken()
    }, [])

    if (isLoading || isUserLoading) {
        return (
            <Paper style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </Paper>
        )
    }

    return children
}
