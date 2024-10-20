import React, { FC, useEffect, useState } from 'react'
import { Modal } from '../../ui/Modal/Modal'
import { VStack } from '../../ui/Stack/VStack'
import { TextField } from '../../ui/TextField/TextField'
import { Button } from '../../ui/Button/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Text } from '../../ui/Text/Text'
import { useUpdateBoardMutation } from '@/src/stores'
import { useAllBoardsActions } from '@/src/stores/boardsStore/allBoardsStore'
import { HStack } from '../../ui/Stack/HStack'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { DeleteModal } from '../DeleteModal'

interface EditBoardModalProps {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    boardId: string
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, 'Title cannot be more than 50 characters'),
    description: Yup.string()
        .required('Description is required')
        .max(300, 'Description cannot be more than 300 characters'),
})

export const EditBoardModal: FC<EditBoardModalProps> = ({ isOpen, setIsOpen, boardId }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [initialValues, setInitialValues] = useState({ title: '', description: '' })
    const [updateBoardApi, { isLoading }] = useUpdateBoardMutation()
    const { updateBoard } = useAllBoardsActions()
    const { boards } = useAppSelector((state) => state.allBoards)

    useEffect(() => {
        const board = boards.find(({ id }) => id !== boardId)
        setInitialValues({ description: board?.description || '', title: board?.title || '' })
    }, [boardId])

    const onSubmit = async (values: { title: string; description: string }) => {
        const { data } = await updateBoardApi({ id: boardId, ...values })
        if (data) {
            updateBoard({ boardId, ...updateBoard })
        }
        setIsOpen(false)
    }

    return (
        <Modal onClose={() => setIsOpen(false)} visible={isOpen} title="Edit Board">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <VStack gap={24}>
                        <TextField
                            onChange={handleChange('title')}
                            placeholder="Title"
                            value={values.title}
                            label="Title"
                            max
                            error={touched.title && errors.title ? errors.title : undefined}
                        />
                        {touched.title && errors.title && <Text variant="error">{errors.title}</Text>}

                        <TextField
                            onChange={handleChange('description')}
                            placeholder="Description"
                            value={values.description}
                            label="Description"
                            max
                            error={touched.description && errors.description ? errors.description : undefined}
                        />
                        {touched.description && errors.description && <Text variant="error">{errors.description}</Text>}

                        <HStack align="center" gap={3}>
                            <Button style={{ width: '60%' }} loading={isLoading} onPress={handleSubmit as any}>
                                Submit
                            </Button>
                            <Button
                                style={{ width: '39%' }}
                                onPress={() => {
                                    setIsDeleteOpen(true)
                                }}
                                variant="error"
                            >
                                Delete
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </Formik>
            <DeleteModal id={boardId} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} type="Board" />
        </Modal>
    )
}
