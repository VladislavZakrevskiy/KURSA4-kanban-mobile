import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Paper } from '../../ui/Paper/Paper'
import { Task } from '../Task/Task'
import { VStack } from '../../ui/Stack/VStack'
import { Text } from '../../ui/Text/Text'
import { Dimensions, View } from 'react-native'
import { TaskModal } from '../Task/TaskModal/TaskModal'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { getColumnById } from '@/src/stores/boardStore/boardStore'
import { HStack } from '../../ui/Stack/HStack'
// @ts-ignore
import DragProvider from 'react-native-useful-dnd'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { stringToColor } from '@/src/lib/helpers/stringToScroll'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { EditColumnModal } from './EditColumnModal'
import { AddColumnModal } from './AddColumnModal'
import { AddTaskModal } from '../Task/TaskModal/AddTaskModal'

interface TaskColumnProps {
    columnId: string
    setCanScroll: (newValue: boolean) => void
    refetch: Function
}

const TaskItem = ({ taskId, setCanScroll }: { taskId: string; setCanScroll: (newValue: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <DragProvider.Draggable key={taskId} id={`task-${taskId}`}>
                {/* @ts-ignore */}
                {({ drag }) => {
                    setCanScroll(!drag)
                    return (
                        <View>
                            <Task isDrag={false} taskId={taskId} setIsOpen={setIsOpen} />
                        </View>
                    )
                }}
            </DragProvider.Draggable>
            <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} taskId={taskId} />
        </>
    )
}

export const TaskColumn: FC<TaskColumnProps> = ({ columnId, setCanScroll, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const columnWidth = Dimensions.get('screen').width * 0.75
    const column = useAppSelector(getColumnById(columnId))
    const { theme } = useAppSelector((state) => state.theme)
    const [isAddOpen, setIsAddOpen] = useState(false)

    return (
        <>
            <DragProvider.DropZone style={{ flex: 1 }} id={`column-${columnId}`}>
                {/* @ts-ignore */}
                {({}) => (
                    <Paper style={{ width: columnWidth }}>
                        <VStack gap={40}>
                            <HStack justify="space-between" align="center">
                                <HStack gap={12} align="center">
                                    <View
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 1000,
                                            backgroundColor: stringToColor(column.title),
                                        }}
                                    />
                                    <Text size={'xl'}>
                                        {column.title} ({column.tasks.length})
                                    </Text>
                                </HStack>
                                <TouchableOpacity onPress={() => setIsOpen(true)}>
                                    <Entypo name="dots-three-vertical" size={24} color={theme.text.caption} />
                                </TouchableOpacity>
                            </HStack>
                            <VStack style={{ overflow: 'visible' }} gap={10}>
                                {column.tasks.map((task) => {
                                    return <TaskItem setCanScroll={setCanScroll} key={task.id} taskId={task.id} />
                                })}
                                <View>
                                    <TouchableOpacity onPress={() => setIsAddOpen(true)}>
                                        <Paper
                                            variant="secondary"
                                            style={{
                                                padding: 30,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                            }}
                                        >
                                            <FontAwesome5 name="plus" size={16} color={theme.text.primary} />
                                        </Paper>
                                    </TouchableOpacity>
                                </View>
                            </VStack>
                        </VStack>
                    </Paper>
                )}
            </DragProvider.DropZone>
            <AddTaskModal
                refetch={refetch}
                status={column.title}
                columnId={column.id}
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
            />
            <EditColumnModal columnId={columnId} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
