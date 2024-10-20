import { Column } from './Column'

export interface Board<WithDetails extends boolean = false> {
    id: string
    title: string
    description: string
    userId: string
    columns: WithDetails extends true ? Column<WithDetails>[] : never
    boardShares: WithDetails extends true ? any[] : never
}
