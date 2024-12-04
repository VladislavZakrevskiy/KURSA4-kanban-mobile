import { rtkApi } from '../rtkApi'
import { CreateColumnDto } from './dto/CreateColumnDto'
import { UpdateColumnDto } from './dto/UpdateColumnDto'
import { DeleteColumnDto } from './dto/DeleteColumnDto'
import { Column } from '@/src/types/Column'
import { Tags } from '../tags'

const columnApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // READ
        getColumn: build.query<Column, DeleteColumnDto>({
            query: ({ columnId }) => `/columns/${columnId}`,
        }),

        // CREATE
        createColumn: build.mutation<Column, CreateColumnDto>({
            query: (body) => ({
                url: '/columns/create',
                method: 'POST',
                body,
            }),
        }),

        // UPDATE
        updateColumn: build.mutation<Column, UpdateColumnDto>({
            query: ({ columnId, ...body }) => ({
                url: `/columns/update/${columnId}`,
                method: 'PATCH',
                body,
            }),
        }),

        // DELETE
        deleteColumn: build.mutation<void, DeleteColumnDto>({
            query: ({ columnId, boardId }) => ({ url: `/columns/delete/${columnId}`, body: { boardId }, method: 'DELETE' }),
        }),
    }),
})

export const { useCreateColumnMutation, useDeleteColumnMutation, useGetColumnQuery, useUpdateColumnMutation } =
    columnApi
