import { Subtask } from "@/src/types/Subtasks"

export interface UpdateTaskWithSubtasksDto {
    taskId: string
    title: string
    description: string
    columnId: string
    subtasks: Subtask[]
}

