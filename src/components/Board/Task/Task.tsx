import React, { FC } from 'react'
import { Card } from '../../ui/Card/Card'
import { Text } from '../../ui/Text/Text'
import { VStack } from '../../ui/Stack/VStack'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { getTaskById, getTasksSubtasks } from '@/src/stores/boardStore/boardStore'
import { Dimensions, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { HStack } from '../../ui/Stack/HStack'

interface TaskProps {
    taskId: string
    isDrag: boolean
    setIsOpen: (newvalue: boolean) => void
}

export const Task: FC<TaskProps> = ({ taskId, isDrag, setIsOpen }) => {
    const task = useAppSelector(getTaskById(taskId))
    const subtasks = useAppSelector(getTasksSubtasks(task.id))
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <Card
            variant={isDrag ? 'secondary' : 'primary'}
            style={{ paddingHorizontal: 16, paddingVertical: 24, width: Dimensions.get('screen').width * 0.75 }}
        >
            <HStack align="center" justify="space-between">
                <VStack gap={8}>
                    <Text>{task.title}</Text>
                    {subtasks?.length !== 0 ? (
                        <Text>
                            {subtasks?.filter(({ isDone }) => isDone)?.length} of {subtasks?.length} subtasks
                        </Text>
                    ) : (
                        <Text>No subtasks</Text>
                    )}
                </VStack>
                <TouchableOpacity onPress={() => setIsOpen(true)}>
                    <Entypo name="dots-three-vertical" size={24} color={theme.text.caption} />
                </TouchableOpacity>
            </HStack>
        </Card>
    )
}
