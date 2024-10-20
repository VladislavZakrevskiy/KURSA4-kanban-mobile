import { FC, ReactNode, useEffect } from 'react'
import { AsyncStorageService } from '@/src/lib/async-storage/storage'
import { THEME_KEY } from '@/src/lib/async-storage/keys'
import { useThemeActions } from '@/src/stores/themeStore/store/themeStore'

interface StorageProviderProps {
    children: ReactNode
}

export const StorageProvider: FC<StorageProviderProps> = ({ children }) => {
    const { setTheme } = useThemeActions()

    useEffect(() => {
        const getSettings = async () => {
            const theme = await AsyncStorageService.getItem<'dark' | 'light'>(THEME_KEY)
            setTheme(theme || 'light')
        }

        getSettings()
    })

    return children
}
