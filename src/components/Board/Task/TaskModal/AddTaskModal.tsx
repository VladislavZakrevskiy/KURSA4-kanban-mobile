import { Button } from '@/src/components/ui/Button/Button'
import { Modal } from '@/src/components/ui/Modal/Modal'
import { HStack } from '@/src/components/ui/Stack/HStack'
import { VStack } from '@/src/components/ui/Stack/VStack'
import { Text } from '@/src/components/ui/Text/Text'
import { TextField } from '@/src/components/ui/TextField/TextField'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useCreateTaskWithSubtasksMutation } from '@/src/stores/api/TaskApi/TaskApi'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { Task } from '@/src/types/Task'
import { Entypo } from '@expo/vector-icons'
import React, { FC, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'

interface Props {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    columnId: string
    status: string
}

export const AddTaskModal: FC<Props> = ({ isOpen, setIsOpen, columnId, status }) => {
    const [formTask, setFormTask] = useState<Omit<Task<true>, 'id'>>({
        columnId: columnId,
        description: '',
        status: '',
        subtasks: [],
        title: '',
    })
    const { addSubtask, addTask } = useBoardActions()
    const [addTaskApi, { isLoading }] = useCreateTaskWithSubtasksMutation()
    const { theme } = useAppSelector((state) => state.theme)

    const onSubmit = async (formTask: Omit<Task<true>, 'id'>) => {
        const { data } = await addTaskApi({
            ...formTask,
            columnId,
            status,
        })

        if (data) {
            const newTask = data.task
            addTask({ ...newTask, subtasks: newTask.subtasks.map((subtask) => ({ ...subtask, isDone: false })) })

            for (const newSubtasks of newTask.subtasks) {
                addSubtask({ ...newSubtasks, isDone: false })
            }
            setIsOpen(false)
        }
    }

    return (
        <Modal onClose={() => setIsOpen(false)} visible={isOpen} title="Edit Board">
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
                            // @ts-ignore
                            setFormTask((prev) => ({
                                ...prev,
                                subtasks: [
                                    ...prev.subtasks,
                                    {
                                        id: '000' + Math.random(),
                                        description: '',
                                        isDone: false,
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

                <Button loading={isLoading} onPress={() => onSubmit(formTask)}>
                    Edit Task
                </Button>
            </VStack>
        </Modal>
    )
}
