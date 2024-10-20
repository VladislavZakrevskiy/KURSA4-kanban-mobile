import { Task } from './Task'

export interface Column<WithTasks extends boolean = false> {
    id: string
    title: string
    description: string
    boardId: string
    tasks: WithTasks extends true ? Task<WithTasks>[] : never
}
