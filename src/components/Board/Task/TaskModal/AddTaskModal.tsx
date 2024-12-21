import { Button } from '@/src/components/ui/Button/Button'
import { Modal } from '@/src/components/ui/Modal/Modal'
import { VStack } from '@/src/components/ui/Stack/VStack'
import { TextField } from '@/src/components/ui/TextField/TextField'
import { useCreateTaskMutation } from '@/src/stores/api/TaskApi/TaskApi'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { Task } from '@/src/types/Task'
import React, { FC, useState } from 'react'

interface Props {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    columnId: string
    status: string
    refetch: Function
}

export const AddTaskModal: FC<Props> = ({ isOpen, setIsOpen, columnId, status, refetch }) => {
    const [formTask, setFormTask] = useState<Omit<Task<true>, 'id'>>({
        columnId: columnId,
        description: '',
        status: '',
        subtasks: [],
        title: '',
    })
    const { addTask } = useBoardActions()
    const [addTaskApi, { isLoading }] = useCreateTaskMutation()

    const onSubmit = async (formTask: Omit<Task<true>, 'id'>) => {
        const { data } = await addTaskApi({
            ...formTask,
            columnId,
            status,
        })
        if (data) {
            const newTask = data
            refetch()
            addTask({ ...newTask, subtasks: [] })
            setIsOpen(false)
        }
    }

    return (
        <Modal onClose={() => setIsOpen(false)} visible={isOpen} title="Add task">
            <VStack gap={24}>
                <TextField
                    label="Title"
                    onChange={(text) => setFormTask((prev) => ({ ...prev, title: text }))}
                    placeholder="e.g. Take coffee break"
                    value={formTask.title}
                    max
                />
                <TextField
                    label="Description"
                    onChange={(text) => setFormTask((prev) => ({ ...prev, description: text }))}
                    placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
                    value={formTask.description}
                    max
                />

                <Button loading={isLoading} onPress={() => onSubmit(formTask)}>
                    Add Task
                </Button>
            </VStack>
        </Modal>
    )
}
