export interface Column {
    id: string
    title: string
    description: string
}

export interface UpdateBoardsWithColsDto {
    id: string
    title: string
    description: string
    columns: Column[]
}
