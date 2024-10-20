import React, { FC } from 'react'
import { Modal } from '../ui/Modal/Modal'
import { Text } from '../ui/Text/Text'
import { VStack } from '../ui/Stack/VStack'
import { Button } from '../ui/Button/Button'
import { useDeleteBoardMutation, useDeleteColumnMutation, useDeleteTaskMutation } from '@/src/stores'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useAllBoardsActions } from '@/src/stores/boardsStore/allBoardsStore'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'

interface AddBoardModalProps {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    id: string
    type: 'Column' | 'Board' | 'Task'
}

export const DeleteModal: FC<AddBoardModalProps> = ({ isOpen, setIsOpen, id, type }) => {
    const [deleteBoardApi, { isLoading: isBoardLaoding }] = useDeleteBoardMutation()
    const [deleteTaskApi, { isLoading: isTaskLaoding }] = useDeleteTaskMutation()
    const [deleteColumnApi, { isLoading: isColumnLoading }] = useDeleteColumnMutation()
    const { deleteColumn, deleteTask } = useBoardActions()
    const { deleteBoard } = useAllBoardsActions()
    const { currentBoard } = useAppSelector((state) => state.board)

    const onDelete = async () => {
        switch (type) {
            case 'Board':
                await deleteBoardApi({ boardId: id })
                deleteBoard({ boardId: id })
                setIsOpen(false)
                break
            case 'Column':
                await deleteColumnApi({ columnId: id, boardId: currentBoard?.id || '' })
                deleteColumn(id)
                setIsOpen(false)
                break
            case 'Task':
                await deleteTaskApi({ taskId: id })
                deleteTask(id)
                setIsOpen(false)
                break
        }
    }

    return (
        <Modal onClose={() => setIsOpen(false)} visible={isOpen} title={`Delete ${type}`}>
            <VStack gap={24}>
                <Text style={{ textAlign: 'center' }} variant="caption">
                    Are you sure you want to delete this {type}? This action cannot be reversed.
                </Text>
                <Button variant="error" loading={isColumnLoading || isBoardLaoding || isTaskLaoding} onPress={onDelete}>
                    Delete {type}
                </Button>
            </VStack>
        </Modal>
    )
}
