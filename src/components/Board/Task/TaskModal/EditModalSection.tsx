import React, { FC, useEffect, useState } from 'react'
import { VStack } from '@/src/components/ui/Stack/VStack'
import { TextField } from '@/src/components/ui/TextField/TextField'
import { Task } from '@/src/types/Task'
import { HStack } from '@/src/components/ui/Stack/HStack'
import { Text } from '@/src/components/ui/Text/Text'
import { Button } from '@/src/components/ui/Button/Button'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useUpdateTaskWithSubtasksMutation } from '@/src/stores'
import { Entypo } from '@expo/vector-icons'
import { FlatList, Pressable, View } from 'react-native'
import { DeleteModal } from '../../DeleteModal'

interface EditModalSectionProps {
    task: Task<true>
    statuses: { title: string; id: string }[]
    setIsOpen: (newValue: boolean) => void
}

export const EditModalSection: FC<EditModalSectionProps> = ({ statuses, task, setIsOpen }) => {
    const [formTask, setFormTask] = useState<Task<true>>({
        columnId: '',
        description: '',
        id: '',
        status: '',
        subtasks: [],
        title: '',
    })
    const { id } = task
    const { updateTask, updateSubtask, addSubtask } = useBoardActions()
    const [updateTaskApi, { isLoading }] = useUpdateTaskWithSubtasksMutation()
    const subtasks = useAppSelector((state) => state.board.subtasks)
    const { theme } = useAppSelector((state) => state.theme)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    useEffect(() => {
        setFormTask({ ...task })
    }, [])

    const onSubmit = async (formTask: Task<true>) => {
        const { data } = await updateTaskApi({
            taskId: id,
            ...formTask,
        })

        if (data) {
            updateTask({ id, changes: data.task })

            for (const newSubtasks of data.task.subtasks) {
                if (!newSubtasks.id.startsWith('000') && subtasks.entities[newSubtasks.id]) {
                    updateSubtask({ id: newSubtasks.id, changes: newSubtasks })
                } else {
                    addSubtask(newSubtasks)
                }
            }
            setIsOpen(false)
        }
    }

    return (
        <>
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
                <VStack gap={12}>
                    <Text>Subtasks</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 130 }}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // 10 пикселей между элементами
                        data={formTask.subtasks}
                        renderItem={({ index: i, item: { id: subtaskId } }) => (
                            <HStack gap={16} align="center" justify="space-between" key={subtaskId}>
                                <TextField
                                    multiline
                                    onChange={(text) =>
                                        setFormTask((prev) => {
                                            prev.subtasks[i].title = text
                                            let newSubtasks = [...prev.subtasks]
                                            newSubtasks[i] = { ...newSubtasks[i], title: text }
                                            return { ...prev, subtasks: newSubtasks }
                                        })
                                    }
                                    placeholder={`e.g. task ${i + 1}`}
                                    value={formTask.subtasks[i].title}
                                    width={'85%'}
                                />
                                <Pressable
                                    onPress={() =>
                                        setFormTask((prev) => ({
                                            ...prev,
                                            subtasks: prev.subtasks.filter(({ id }) => id !== subtaskId),
                                        }))
                                    }
                                >
                                    <Entypo name="cross" size={24} color={theme.text.primary} />
                                </Pressable>
                            </HStack>
                        )}
                    ></FlatList>
                    <Button
                        onPress={() =>
                            setFormTask((prev) => ({
                                ...prev,
                                subtasks: [
                                    ...prev.subtasks,
                                    {
                                        id: '000' + Math.random(),
                                        description: '',
                                        isDone: false,
                                        taskId: task.id,
                                        title: '',
                                    },
                                ],
                            }))
                        }
                        variant="secondary"
                    >
                        + Add New Subtask
                    </Button>
                </VStack>

                <HStack gap={5} align="center">
                    <Button style={{ width: '60%' }} loading={isLoading} onPress={() => onSubmit(formTask)}>
                        Edit Task
                    </Button>
                    <Button variant="error" style={{ width: '39%' }} onPress={() => setIsDeleteOpen(true)}>
                        Delete
                    </Button>
                </HStack>
            </VStack>
            <DeleteModal id={task.id} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} type="Task" />
        </>
    )
}
