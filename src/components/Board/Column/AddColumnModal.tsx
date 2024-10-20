import React, { FC } from 'react'
import { Modal } from '../../ui/Modal/Modal'
import { Text } from '../../ui/Text/Text'
import { TextField } from '../../ui/TextField/TextField'
import { VStack } from '../../ui/Stack/VStack'
import { Button } from '../../ui/Button/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useCreateColumnMutation } from '@/src/stores'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'

interface AddColumnModalProps {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, 'Title cannot be more than 50 characters'),
    description: Yup.string()
        .required('Description is required')
        .max(300, 'Description cannot be more than 300 characters'),
})

export const AddColumnModal: FC<AddColumnModalProps> = ({ isOpen, setIsOpen }) => {
    const [addColumnApi, { isLoading }] = useCreateColumnMutation()
    const { addColumn } = useBoardActions()
    const { currentBoard } = useAppSelector((state) => state.board)
    const initialValues = { title: '', description: '' }

    const onSubmit = async (values: { title: string; description: string }) => {
        const { data } = await addColumnApi({ boardId: currentBoard?.id || '', ...values })
        if (data) {
            addColumn({ ...data, tasks: [] })
        }
        setIsOpen(false)
    }

    return (
        <>
            <Modal onClose={() => setIsOpen(false)} visible={isOpen} title="Add New Column">
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
                            {touched.title && errors.title && <Text color="red">{errors.title}</Text>}

                            <TextField
                                onChange={handleChange('description')}
                                placeholder="Description"
                                value={values.description}
                                label="Description"
                                max
                                error={touched.description && errors.description ? errors.description : undefined}
                            />
                            {touched.description && errors.description && <Text color="red">{errors.description}</Text>}

                            <Button loading={isLoading} onPress={handleSubmit as any}>
                                Submit
                            </Button>
                        </VStack>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
