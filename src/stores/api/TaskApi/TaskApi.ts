import { rtkApi } from '../rtkApi'
import { Subtask } from '@/src/types/Subtasks'
import { GetColTasksDto } from './dto/GetColTasksDto'
import { CreateTaskDto } from './dto/CreateTaskDto'
import { UpdateTaskDto } from './dto/UpdateTaskDto'
import { UpdateTaskWithSubtasksDto } from './dto/UpdateTaskWithSubtasksDto'
import { DeleteTaskDto } from './dto/DeleteTaskDto'
import { Task } from '@/src/types/Task'
import { Tags } from '../tags'

const taskApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // READ
        getTasksByCol: build.query<Task, GetColTasksDto>({
            query: ({ columnId }) => `/tasks/by-column/${columnId}`,
        }),

        // CREATE
        createTask: build.mutation<Task, CreateTaskDto>({
            query: (body) => ({
                url: '/tasks/create',
                method: 'POST',
                body,
            }),
        }),

        createTaskWithSubtasks: build.mutation<{ task: Task<true> }, CreateTaskDto>({
            query: (body) => ({
                url: '/tasks/create-with-subtasks',
                method: 'POST',
                body,
            }),
        }),

        // UPDATE
        updateTask: build.mutation<Task, UpdateTaskDto>({
            query: ({ taskId, ...body }) => ({
                url: `/tasks/update/${taskId}`,
                method: 'PATCH',
                body,
            }),
        }),

        updateTaskWithSubtasks: build.mutation<{ task: Task<true> }, UpdateTaskWithSubtasksDto>({
            query: ({ taskId, ...body }) => ({
                url: `/tasks/update-with-subtasks/${taskId}`,
                method: 'PATCH',
                body,
            }),
        }),

        moveTask: build.mutation<void, { newColumnId: string; taskId: string }>({
            query: ({ newColumnId, taskId }) => ({
                url: `/tasks/move-task/${taskId}`,
                method: 'PATCH',
                body: {
                    newColumnId,
                },
            }),
        }),

        // DELETE
        deleteTask: build.mutation<void, DeleteTaskDto>({
            query: ({ taskId }) => ({ url: `/tasks/${taskId}`, method: 'DELETE' }),
        }),
    }),
})

export const {
    useCreateTaskMutation,
    useCreateTaskWithSubtasksMutation,
    useDeleteTaskMutation,
    useGetTasksByColQuery,
    useUpdateTaskMutation,
    useUpdateTaskWithSubtasksMutation,
    useMoveTaskMutation,
} = taskApi
