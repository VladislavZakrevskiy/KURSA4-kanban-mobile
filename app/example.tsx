import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DragProvider from 'react-native-useful-dnd'

interface Task {
    id: string
    title: string
}

const initialData: Task[][] = [
    [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
    ],
    [
        { id: '3', title: 'Task 3' },
        { id: '4', title: 'Task 4' },
    ],
    [
        { id: '5', title: 'Task 5' },
        { id: '6', title: 'Task 6' },
    ],
]

const TaskItem = ({ task, drag, dragOver }) => {
    return (
        <View style={[styles.taskItem, drag && styles.dragging, dragOver && styles.dragOver]}>
            <Text>{task.title}</Text>
        </View>
    )
}

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Task[][]>(initialData)

    const handleDrop = (draggableId, dropZoneId) => {
        const sourceColumnIndex = columns.findIndex((column) => column.some((task) => task.id === draggableId))
        const targetColumnIndex = parseInt(dropZoneId.split('-')[1])

        if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
            const updatedColumns = [...columns]
            const [draggedTask] = updatedColumns[sourceColumnIndex].splice(
                updatedColumns[sourceColumnIndex].findIndex((task) => task.id === draggableId),
                1
            )
            updatedColumns[targetColumnIndex].push(draggedTask)
            setColumns(updatedColumns)
        }
    }

    return (
        <DragProvider onDrop={handleDrop}>
            <View style={styles.container}>
                {columns.map((column, columnIndex) => (
                    <DragProvider.DropZone style={styles.column} id={`dropZone-${columnIndex}`}>
                        {({ dropOver }) => (
                            <>
                                <Text style={styles.columnTitle}>Column {columnIndex + 1}</Text>

                                {column.map((task) => (
                                    <DragProvider.Draggable key={task.id} id={task.id}>
                                        {({ dragOver, drag }) => (
                                            <TaskItem task={task} drag={drag} dragOver={dragOver} />
                                        )}
                                    </DragProvider.Draggable>
                                ))}
                            </>
                        )}
                    </DragProvider.DropZone>
                ))}
            </View>
        </DragProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    column: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        position: 'relative',
    },
    columnTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    taskItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    dragging: {
        borderWidth: 1,
        borderColor: 'red',
    },
    dragOver: {
        borderWidth: 5,
        borderColor: 'olive',
    },
    dropZone: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    dropZoneActive: {
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
    },
})

export default KanbanBoard
