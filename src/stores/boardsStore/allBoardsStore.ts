import { buildSlice } from '@/src/lib/store/buildSlice'
import { Board } from '@/src/types/Board'
import { PayloadAction } from '@reduxjs/toolkit'

interface AllBoardsSchema {
    boards: Board[]
}

const initialState: AllBoardsSchema = {
    boards: [],
}

const allBoardsStore = buildSlice({
    name: 'allBoards',
    initialState,
    reducers: {
        setAllBoards: (state, action: PayloadAction<Board[]>) => {
            state.boards = action.payload
        },

        deleteBoard: (state, action: PayloadAction<{ boardId: string }>) => {
            state.boards = state.boards.filter(({ id }) => id !== action.payload.boardId)
        },

        updateBoard: (state, action: PayloadAction<{ boardId: string } & Partial<Board>>) => {
            const { boardId, ...board } = action.payload
            for (let i = 0; i < state.boards.length; i++) {
                if (state.boards[i].id === boardId) {
                    state.boards[i] = { ...board, ...state.boards[i] }
                }
            }
        },
    },
})

export const { reducer: AllBoardsReducer, useActions: useAllBoardsActions } = allBoardsStore
