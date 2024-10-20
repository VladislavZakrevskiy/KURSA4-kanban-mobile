import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ThemeReducer } from './themeStore/store/themeStore'
import { rtkApi } from './api/rtkApi'
import { UserReducer } from './userStore/userStore'
import { AllBoardsReducer } from './boardsStore/allBoardsStore'
import { BoardReducer } from './boardStore/boardStore'
import Contants from 'expo-constants'

const rootReducers = combineReducers({
    theme: ThemeReducer,
    allBoards: AllBoardsReducer,
    user: UserReducer,
    board: BoardReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
})

export const createReduxStore = () => {
    const store = configureStore({
        reducer: rootReducers,
        devTools: Contants.expoConfig?.extra?.IS_DEV === 'true',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(rtkApi.middleware),
    })

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>
