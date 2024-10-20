import { rtkApi } from '../rtkApi'
import { User } from '@/src/types/User'
import { AuthDto } from './dto/AuthDto'
import { RegisterDto } from './dto/RegisterDto'

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // GET
        getProfile: build.query<User, void>({
            query: () => '/auth/profile',
        }),

        // CREATE
        login: build.mutation<{ user: User; access_token: string }, AuthDto>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),

        register: build.mutation<{ user: User; access_token: string }, RegisterDto>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetProfileQuery, useLazyGetProfileQuery, useLoginMutation, useRegisterMutation } = userApi
