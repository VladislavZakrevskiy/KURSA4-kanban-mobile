import { Button, HStack, Paper, Text } from '@/src/components'
import { TaskColumn } from '@/src/components/Board/Column/TaskColumn'
import { AuthProvider } from '@/src/components/providers/AuthProvider/AuthProvider'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useThrottledState } from '@/src/lib/hooks/useThrottleState'
import { useGetBoardsByIdQuery } from '@/src/stores'
import { useMoveTaskMutation } from '@/src/stores/api/TaskApi/TaskApi'
import { getBoardColumns, useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// @ts-ignore
import DragProvider from 'react-native-useful-dnd'

const BoardPage = () => {
    const { id } = useLocalSearchParams()
    const { currentBoard } = useAppSelector((state) => state.board)
    const columns = useAppSelector(getBoardColumns)
    const { data, isLoading, isError } = useGetBoardsByIdQuery((id as string) || '', {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })
    const { setBoard, moveTask } = useBoardActions()
    const router = useRouter()
    const vertScrollViewRef = useRef<ScrollView | null>(null)
    const horScrollViewRef = useRef<ScrollView | null>(null)
    const { tasks } = useAppSelector((state) => state.board)
    const [canScoll, setCanScroll] = useThrottledState(true, 300)
    const [moveTaskApi] = useMoveTaskMutation()

    useEffect(() => {
        if (data) {
            setBoard(data)
        }
    }, [data])

    if (currentBoard?.columns.length === 0) {
        return (
            <AuthProvider>
                <Paper
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text variant="caption">No columns! Add it!</Text>
                </Paper>
            </AuthProvider>
        )
    }

    if (isLoading) {
        return (
            <AuthProvider>
                <Paper
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator size={'large'} color="" />
                </Paper>
            </AuthProvider>
        )
    }

    if (!currentBoard || isError) {
        return (
            <AuthProvider>
                <Paper
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Sorry, but board not found</Text>
                    <Button onPress={() => router.push('/')}>Go to main</Button>
                </Paper>
            </AuthProvider>
        )
    }

    const columnWidth = Dimensions.get('screen').width * 0.75 + 24
    const handleDrop = (draggableId: string, dropZoneId: string) => {
        setCanScroll(true)
        const currentTask = tasks.entities[draggableId.slice(5)]
        moveTask({
            sourceColumnId: currentTask.columnId,
            taskId: draggableId.slice(5),
            targetColumnId: dropZoneId.slice(7),
        })
        moveTaskApi({ newColumnId: dropZoneId.slice(7), taskId: draggableId.slice(5) })
    }

    const handleDragMove = () => {
        setCanScroll(false)
    }

    return (
        <DragProvider onDrop={handleDrop} onDragMove={handleDragMove}>
            <AuthProvider>
                <Paper style={{ flex: 1 }}>
                    <ScrollView ref={vertScrollViewRef} showsVerticalScrollIndicator={false} scrollEnabled={canScoll}>
                        <ScrollView
                            ref={horScrollViewRef}
                            horizontal={true}
                            pagingEnabled={true}
                            scrollEnabled={canScoll}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={columnWidth}
                            decelerationRate="fast"
                        >
                            <GestureHandlerRootView style={{ flex: 1 }}>
                                <HStack gap={24} style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 24 }}>
                                    {columns.map((column) => (
                                        <TaskColumn setCanScroll={setCanScroll} columnId={column.id} key={column.id} />
                                    ))}
                                </HStack>
                            </GestureHandlerRootView>
                        </ScrollView>
                    </ScrollView>
                </Paper>
            </AuthProvider>
        </DragProvider>
    )
}

export default BoardPage
