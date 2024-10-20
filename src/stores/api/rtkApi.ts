import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCESS_TOKEN } from '@/src/lib/async-storage/keys'
import { AsyncStorageService } from '@/src/lib/async-storage/storage'
import Contants from 'expo-constants'
import { Tags } from './tags'

export const rtkApi = createApi({
    reducerPath: 'api',
    tagTypes: [Tags.BOARD, Tags.COLUMN, Tags.SUBTASK, Tags.TASK, Tags.USER],
    baseQuery: fetchBaseQuery({
        baseUrl: Contants.expoConfig?.extra?.API_URL,
        prepareHeaders: async (headers) => {
            const token = (await AsyncStorageService.getItem(ACCESS_TOKEN)) || ''
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({}),
})
