import { Board } from '@/src/types/Board'
import { rtkApi } from '../rtkApi'
import { CreateBoardDto } from './dto/CreateBoardDto'
import { CreateBoardWithColsDto } from './dto/CreateBoardWithColsDto'
import { ShareBoardsDto } from './dto/ShareBoardsDto'
import { UpdateBoardsDto } from './dto/UpdateBoardsDto'
import { UpdateBoardsWithColsDto } from './dto/UpdateBoardsWithColsDto'
import { DeleteBoardDto } from './dto/DeleteBoardDto'
import { Tags } from '../tags'

const boardApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // READ
        getUserBoardsDetails: build.query<Board[], void>({
            query: () => `/boards/details`,
        }),

        getUserBoards: build.query<Board<true>[], void>({
            query: () => `/boards`,
        }),

        getBoardsById: build.query<Board<true>, string>({
            query: (id) => ({ url: `/boards/${id}`, cache: 'no-cache' }),
        }),

        // CREATE
        createBoard: build.mutation<Board, CreateBoardDto>({
            query: (body) => ({
                url: '/boards/create',
                method: 'POST',
                body,
            }),
        }),

        createBoardWithCols: build.mutation<Board, CreateBoardWithColsDto>({
            query: (body) => ({
                url: '/boards/create-with-columns',
                method: 'POST',
                body,
            }),
        }),

        shareBoard: build.mutation<Board, ShareBoardsDto>({
            query: ({ boardId, userId }) => ({ url: `/boards/share/${boardId}`, method: 'POST', body: { userId } }),
        }),

        // UPDATE
        updateBoard: build.mutation<Board, UpdateBoardsDto>({
            query: ({ id, ...body }) => ({
                url: `/boards/update/${id}`,
                method: 'PATCH',
                body,
            }),
        }),

        updateBoardWithCols: build.mutation<Board, UpdateBoardsWithColsDto>({
            query: ({ id, ...body }) => ({
                url: `/boards/update-with-columns/${id}`,
                method: 'PATCH',
                body,
            }),
        }),

        // DELETE
        deleteBoard: build.mutation<void, DeleteBoardDto>({
            query: ({ boardId }) => ({ url: `/boards/delete/${boardId}`, method: 'DELETE' }),
        }),
    }),
})

export const {
    useCreateBoardMutation,
    useCreateBoardWithColsMutation,
    useDeleteBoardMutation,
    useGetBoardsByIdQuery,
    useGetUserBoardsDetailsQuery,
    useGetUserBoardsQuery,
    useShareBoardMutation,
    useUpdateBoardMutation,
    useUpdateBoardWithColsMutation,
} = boardApi
