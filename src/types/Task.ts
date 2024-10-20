import { Subtask } from './Subtasks'

export interface Task<WithColumns extends boolean = false> {
    id: string
    title: string
    description: string
    status: string
    columnId: string
    subtasks: WithColumns extends true ? Subtask[] : never
}
