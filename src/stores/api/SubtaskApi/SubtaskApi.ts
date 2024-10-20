import { rtkApi } from '../rtkApi'
import { DeleteSubtaskDto } from './dto/DeleteSubtaskDto'
import { CreateSubtaskDto } from './dto/CreateSubtaskDto'
import { UpdateSubtaskDto } from './dto/UpdateSubtaskDto'
import { GetSubtaskDto } from './dto/GetSubtaskDto'
import { Subtask } from '@/src/types/Subtasks'

const subtaskApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // READ
        getSubtasks: build.query<Subtask, GetSubtaskDto>({
            query: ({ taskId }) => `/subtasks/by-task/${taskId}`,
        }),

        // CREATE
        createSubtask: build.mutation<Subtask[], CreateSubtaskDto>({
            query: (body) => ({
                url: '/subtasks/create',
                method: 'POST',
                body,
            }),
        }),

        // UPDATE
        updateSubtask: build.mutation<Subtask, UpdateSubtaskDto>({
            query: ({ subtaskId, ...body }) => ({
                url: `/subtasks/update/${subtaskId}`,
                method: 'PATCH',
                body,
            }),
        }),

        // DELETE
        deleteSubtask: build.mutation<void, DeleteSubtaskDto>({
            query: ({ subtaskId }) => ({ url: `/subtasks/${subtaskId}`, method: 'DELETE' }),
        }),
    }),
})

export const { useCreateSubtaskMutation, useDeleteSubtaskMutation, useGetSubtasksQuery, useUpdateSubtaskMutation } =
    subtaskApi
