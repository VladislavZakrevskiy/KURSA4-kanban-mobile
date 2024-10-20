import { RootState } from '../store'

export const getCurrentBoard = (boardId: string) => (state: RootState) =>
    state.allBoards.boards.find(({ id }) => id === boardId)
