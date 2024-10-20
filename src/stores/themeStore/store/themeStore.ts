import { PayloadAction } from '@reduxjs/toolkit'
import { Theme } from '../themes/Theme'
import { lightTheme } from '../themes/lightTheme'
import { darkTheme } from '../themes/darkTheme'
import { buildSlice } from '@/src/lib/store/buildSlice'

interface ThemeSchema {
    theme: Theme
    themeName: 'dark' | 'light'
}

const initialState: ThemeSchema = {
    theme: lightTheme,
    themeName: 'light',
}

const themeStore = buildSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
            state.theme = action.payload === 'dark' ? darkTheme : lightTheme
            state.themeName = action.payload
        },
    },
})

export const { reducer: ThemeReducer, useActions: useThemeActions } = themeStore
