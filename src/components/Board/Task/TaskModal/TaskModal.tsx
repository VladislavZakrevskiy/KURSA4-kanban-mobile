import React, { FC, useState } from 'react'
import { Modal } from '@/src/components'
import { EditModalSection } from './EditModalSection'
import { ViewModalSection } from './ViewModalSection'
import { Entypo } from '@expo/vector-icons'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { TouchableOpacity } from 'react-native'
import { getBoardColumns, getTaskById } from '@/src/stores/boardStore/boardStore'

interface TaskModalProps {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    taskId: string
}

export const TaskModal: FC<TaskModalProps> = ({ isOpen, setIsOpen, taskId }) => {
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const task = useAppSelector(getTaskById(taskId))
    const { title } = task
    const { theme } = useAppSelector((state) => state.theme)
    const columns = useAppSelector(getBoardColumns)
    const statuses = columns.map(({ title, id }) => ({ title, id }))

    return (
        <Modal
            after={
                <TouchableOpacity onPress={() => setMode((prev) => (prev === 'edit' ? 'view' : 'edit'))}>
                    <Entypo name="dots-three-vertical" size={24} color={theme.text.caption} />
                </TouchableOpacity>
            }
            title={mode ? title : 'Edit Task'}
            visible={isOpen}
            onClose={() => setIsOpen(false)}
        >
            {mode === 'edit' ? (
                <EditModalSection setIsOpen={setIsOpen} statuses={statuses} task={task} />
            ) : (
                <ViewModalSection statuses={statuses || []} task={task} />
            )}
        </Modal>
    )
}
