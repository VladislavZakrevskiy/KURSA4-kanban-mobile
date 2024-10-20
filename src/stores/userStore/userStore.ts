import { buildSlice } from '@/src/lib/store/buildSlice'
import { User } from '@/src/types/User'
import { PayloadAction } from '@reduxjs/toolkit'

interface UserSchema {
    user: User | null
    isLoading: boolean
}

const initialState: UserSchema = {
    user: null,
    isLoading: false,
}

const userStore = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

export const { reducer: UserReducer, useActions: useUserActions } = userStore
