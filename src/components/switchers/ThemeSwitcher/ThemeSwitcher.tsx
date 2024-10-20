import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useThemeActions } from '@/src/stores/themeStore/store/themeStore'
import { Sun } from '../../icons/Sun'
import { Moon } from '../../icons/Moon'
import { HStack } from '../../ui/Stack/HStack'
import { ToggleSwitcher } from '../../ui/ToggleSwitcher/ToggleSwitcher'
import { AsyncStorageService } from '@/src/lib/async-storage/storage'
import { THEME_KEY } from '@/src/lib/async-storage/keys'

export const ThemeSwitcher = () => {
    const { setTheme } = useThemeActions()
    const { themeName } = useAppSelector((state) => state.theme)

    return (
        <HStack align="center" gap={24}>
            <Sun />
            <ToggleSwitcher
                checked={themeName !== 'light'}
                onChange={(isLight) => {
                    setTheme(isLight ? 'dark' : 'light')
                    AsyncStorageService.setItem(THEME_KEY, isLight ? 'dark' : 'light')
                }}
            />
            <Moon />
        </HStack>
    )
}
