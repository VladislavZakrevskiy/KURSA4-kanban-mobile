import { createEntityAdapter, createSelector, current, PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/src/lib/store/buildSlice'
import { Board as BoardType } from '@/src/types/Board'
import { Column as ColumnType } from '@/src/types/Column'
import { Subtask } from '@/src/types/Subtasks'
import { Task as TaskType } from '@/src/types/Task'
import { RootState } from '../store'

type Task = TaskType<true>
type Column = ColumnType<true>
type Board = BoardType<true>

const columnsAdapter = createEntityAdapter<Column>()
const tasksAdapter = createEntityAdapter<Task>()
const subtasksAdapter = createEntityAdapter<Subtask>()

const initialState = {
    currentBoard: null as Board | null,
    columns: columnsAdapter.getInitialState(),
    tasks: tasksAdapter.getInitialState(),
    subtasks: subtasksAdapter.getInitialState(),
}

const boardSlice = buildSlice({
    name: 'currentBoard',
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<Board>) => {
            state.currentBoard = action.payload
            columnsAdapter.setAll(state.columns, action.payload.columns)
            let tasks: Task[] = []
            let subtasks: Subtask[] = []
            for (const column of action.payload.columns) {
                tasks = [...tasks, ...column.tasks]
            }
            for (const column of action.payload.columns) {
                for (const task of column.tasks) {
                    subtasks = [...subtasks, ...(task.subtasks || [])]
                }
            }
            tasksAdapter.setAll(state.tasks, tasks)
            subtasksAdapter.setAll(state.subtasks, subtasks)
        },

        clearBoard: (state) => {
            state.currentBoard = null
            columnsAdapter.removeAll(state.columns)
            tasksAdapter.removeAll(state.tasks)
            subtasksAdapter.removeAll(state.subtasks)
        },

        // --- Column actions ---
        addColumn: (state, action: PayloadAction<Column>) => {
            columnsAdapter.addOne(state.columns, action.payload)
            state.currentBoard!.columns = [...state.currentBoard!.columns, action.payload]
        },
        updateColumn: (state, action: PayloadAction<{ id: string; changes: Partial<Column> }>) => {
            columnsAdapter.updateOne(state.columns, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        deleteColumn: (state, action: PayloadAction<string>) => {
            columnsAdapter.removeOne(state.columns, action.payload)
            state.currentBoard!.columns = state.currentBoard!.columns.filter(({ id }) => id !== action.payload)
        },

        // --- Task actions ---
        addTask: (state, action: PayloadAction<Task>) => {
            tasksAdapter.addOne(state.tasks, action.payload)
            state.columns.entities[action.payload.columnId].tasks.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) => {
            tasksAdapter.updateOne(state.tasks, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.entities[action.payload]
            tasksAdapter.removeOne(state.tasks, action.payload)
            state.columns.entities[task.columnId].tasks = state.columns.entities[task.columnId].tasks.filter(
                ({ id }) => id !== action.payload
            )
        },

        // --- Subtask actions ---
        addSubtask: (state, action: PayloadAction<Subtask>) => {
            subtasksAdapter.addOne(state.subtasks, action.payload)
        },
        updateSubtask: (state, action: PayloadAction<{ id: string; changes: Partial<Subtask> }>) => {
            subtasksAdapter.updateOne(state.subtasks, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        deleteSubtask: (state, action: PayloadAction<string>) => {
            subtasksAdapter.removeOne(state.subtasks, action.payload)
        },

        moveTask: (
            state,
            action: PayloadAction<{
                sourceColumnId: string
                targetColumnId: string
                taskId: string
            }>
        ) => {
            const { sourceColumnId, targetColumnId, taskId } = action.payload
            const source = state.columns.entities[sourceColumnId]
            const targer = state.columns.entities[targetColumnId]
            const task = state.tasks.entities[taskId]
            // console.log(targer)
            // console.log(source)
            // console.log(sourceColumnId)
            // console.log(targetColumnId)
            // console.log(state.columns.entities)
            if (source.id === targer.id) {
                return
            }

            tasksAdapter.updateOne(state.tasks, {
                id: taskId,
                changes: { columnId: targetColumnId, status: state.columns.entities[targetColumnId].title },
            })
            columnsAdapter.updateMany(state.columns, [
                { id: sourceColumnId, changes: { tasks: source.tasks.filter(({ id }) => id !== taskId) } },
                { id: targetColumnId, changes: { tasks: [...targer.tasks, task] } },
            ])
        },
    },
})
// Селектор для получения столбцов из состояния
export const getBoardColumns = (state: RootState) => {
    const board = state.board.currentBoard
    return board ? board.columns.map(({ id }) => state.board.columns.entities[id]) : []
}

// Селектор для получения задач по идентификатору столбца
export const getColumnTasks = (columnId: string) =>
    createSelector(
        (state: RootState) => state.board.tasks, // Получение состояния задач
        (tasks) => tasks.ids.map((id) => tasks.entities[id]).filter((task) => task.columnId === columnId) // Фильтрация по columnId
    )

// Селектор для получения подзадач по идентификатору задачи
export const getTasksSubtasks = (taskId: string) =>
    createSelector(
        (state: RootState) => state.board.tasks,
        (state: RootState) => state.board.subtasks,
        (tasks, subtasks) => {
            const task = tasks.entities[taskId]
            return task ? task.subtasks.map(({ id }) => subtasks.entities[id]) : []
        }
    )

// Селектор для получения столбца по его идентификатору
export const getColumnById = (columnId: string) =>
    createSelector(
        (state: RootState) => state.board.columns,
        (columns) => columns.entities[columnId] // Получаем столбец по идентификатору
    )

// Селектор для получения задачи по её идентификатору
export const getTaskById = (taskId: string) =>
    createSelector(
        (state: RootState) => state.board.tasks,
        (tasks) => tasks.entities[taskId] // Получаем задачу по идентификатору
    )

// Селектор для получения подзадачи по её идентификатору
export const getSubtaskById = (subtaskId: string) =>
    createSelector(
        (state: RootState) => state.board.subtasks,
        (subtasks) => subtasks.entities[subtaskId] // Получаем подзадачу по идентификатору
    )

export const { reducer: BoardReducer, useActions: useBoardActions } = boardSlice
