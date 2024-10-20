import React, { FC, useState } from 'react'
import { VStack } from '@/src/components/ui/Stack/VStack'
import { Task } from '@/src/types/Task'
import { Text } from '@/src/components/ui/Text/Text'
import { Checkbox } from '@/src/components/ui/Checkbox/Checkbox'
import { getTasksSubtasks, useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useUpdateSubtaskMutation, useUpdateTaskMutation } from '@/src/stores'
import { Select } from '@/src/components/ui/Select/Select'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'

interface ViewModalSectionProps {
    task: Task<true>
    statuses: { title: string; id: string }[]
}

export const ViewModalSection: FC<ViewModalSectionProps> = ({ task, statuses }) => {
    const { description, id, title, columnId } = task
    const subtasks = useAppSelector(getTasksSubtasks(id))
    const { updateSubtask, updateTask, moveTask } = useBoardActions()
    const [updateSubtaskApi, { isLoading }] = useUpdateSubtaskMutation()
    const [loadingSubtaskId, setLoadingSubtaskId] = useState('')
    const [updateTaskApi] = useUpdateTaskMutation()
    const columns = useAppSelector((state) => state.board.columns)

    return (
        <VStack gap={24}>
            <Text size={'m'} variant="caption">
                {description}
            </Text>
            <VStack gap={8}>
                <Text variant="caption" style={{ marginBottom: 8 }}>
                    Subtasks ({subtasks.filter(({ isDone }) => isDone).length} of {subtasks.length})
                </Text>
                {subtasks.map(({ isDone, id, title, description }) => (
                    <Checkbox
                        checked={isDone}
                        loading={isLoading && id === loadingSubtaskId}
                        key={id}
                        onChange={(newValue) => {
                            setLoadingSubtaskId(id)
                            updateSubtaskApi({ subtaskId: id, description, isDone: newValue, title })
                            updateSubtask({
                                id,
                                changes: { isDone: newValue },
                            })
                        }}
                    >
                        {title}
                    </Checkbox>
                ))}
            </VStack>
            <Select
                disable
                label="Current status"
                placeholder="Choose status"
                onValueChange={(newValue) => {
                    if (columnId === newValue) return
                    updateTaskApi({ description, columnId: newValue, taskId: id, title })
                    updateTask({
                        changes: { columnId: newValue, status: columns.entities[newValue].title },
                        id,
                    })
                    moveTask({ sourceColumnId: columnId, targetColumnId: newValue, taskId: id })
                }}
                options={statuses.map(({ id, title }) => ({ label: title, value: id }))}
                selectedValue={columnId}
            />
        </VStack>
    )
}
