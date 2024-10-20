export interface Subtask {
    id: string
    title: string
    description: string
    isDone: boolean
}

export interface UpdateTaskWithSubtasksDto {
    taskId: string
    title: string
    description: string
    columnId: string
    subtasks: Subtask[]
}

