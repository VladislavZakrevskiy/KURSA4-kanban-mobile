import React, { FC, useEffect, useState } from 'react'
import { Modal } from '../../ui/Modal/Modal'
import { Text } from '../../ui/Text/Text'
import { TextField } from '../../ui/TextField/TextField'
import { VStack } from '../../ui/Stack/VStack'
import { Button } from '../../ui/Button/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useUpdateColumnMutation } from '@/src/stores'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { getColumnById } from '../../../stores/boardStore/boardStore'
import { DeleteModal } from '../DeleteModal'
import { HStack } from '../../ui/Stack/HStack'

interface EditColumnModalProps {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    columnId: string
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, 'Title cannot be more than 50 characters'),
    description: Yup.string()
        .required('Description is required')
        .max(300, 'Description cannot be more than 300 characters'),
})

export const EditColumnModal: FC<EditColumnModalProps> = ({ isOpen, setIsOpen, columnId }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [updateColumn, { isLoading }] = useUpdateColumnMutation()
    const { addColumn } = useBoardActions()
    const [initialValues, setInitialValues] = useState({ title: '', description: '' })
    const column = useAppSelector(getColumnById(columnId))

    useEffect(() => {
        if (column) {
            setInitialValues(column)
        }
    }, [column])

    const onSubmit = async (values: { title: string; description: string }) => {
        const { data } = await updateColumn({ columnId, ...values })
        if (data) {
            addColumn({ ...data, tasks: [] })
        }
        setIsOpen(false)
    }

    return (
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
            <DeleteModal id={columnId} setIsOpen={setIsDeleteOpen} isOpen={isDeleteOpen} type="Column" />
        </Modal>
    )
}
