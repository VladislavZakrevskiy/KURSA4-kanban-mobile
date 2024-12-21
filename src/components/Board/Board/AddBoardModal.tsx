import React, { FC } from 'react'
import { Modal } from '../../ui/Modal/Modal'
import { VStack } from '../../ui/Stack/VStack'
import { TextField } from '../../ui/TextField/TextField'
import { Button } from '../../ui/Button/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Text } from '../../ui/Text/Text'
import { useCreateBoardMutation } from '@/src/stores'
import { useBoardActions } from '@/src/stores/boardStore/boardStore'
import { useAllBoardsActions } from '@/src/stores/boardsStore/allBoardsStore'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'

interface AddBoardModalProps {
    isOpen: boolean
    setIsOpen: (newValue: boolean) => void
    refetch: Function
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, 'Title cannot be more than 50 characters'),
    description: Yup.string()
        .required('Description is required')
        .max(300, 'Description cannot be more than 300 characters'),
})

export const AddBoardModal: FC<AddBoardModalProps> = ({ isOpen, setIsOpen, refetch }) => {
    const initialValues = { title: '', description: '' }
    const [addBoardApi, { isLoading }] = useCreateBoardMutation()
    const { boards } = useAppSelector((state) => state.allBoards)
    const { setAllBoards } = useAllBoardsActions()

    const onSubmit = async (values: { title: string; description: string }) => {
        const { data } = await addBoardApi(values)
        console.log(data)
        if (data) {
            setAllBoards([...boards, data])
            await refetch()
        }
        setIsOpen(false)
    }

    return (
        <Modal onClose={() => setIsOpen(false)} visible={isOpen} title="Add New Board">
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

                        <Button loading={isLoading} onPress={handleSubmit as any}>
                            Submit
                        </Button>
                    </VStack>
                )}
            </Formik>
        </Modal>
    )
}
