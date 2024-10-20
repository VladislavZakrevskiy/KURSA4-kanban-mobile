import React, { useState } from 'react'
import {
    Button,
    Checkbox,
    HStack,
    Modal,
    Paper,
    Select,
    Text,
    TextField,
    ThemeSwitcher,
    ToggleSwitcher,
    VStack,
} from '@/src/components'
import { ScrollView } from 'react-native'
import { AuthProvider } from '@/src/components/providers/AuthProvider/AuthProvider'

export default function DesignScreen() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <AuthProvider>
            <Paper>
                <ScrollView>
                    <VStack gap={20} style={{ padding: 10 }}>
                        <HStack justify="center" style={{ padding: 10 }}>
                            <ThemeSwitcher />
                        </HStack>

                        {/* Variants */}
                        <VStack gap={10}>
                            <Text bold>Variants</Text>
                            <VStack gap={5}>
                                <Button>Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="error">Error</Button>
                                <Button disabled>Disable</Button>
                                <Button loading>Loading</Button>
                            </VStack>
                        </VStack>
                        {/* Sizes */}
                        <VStack gap={10}>
                            <Text bold>Sizes</Text>
                            <VStack gap={5}>
                                <Button size="xl">XL size</Button>
                                <Button size="l">L size</Button>
                                <Button size="m">M size</Button>
                                <Button size="s">S size</Button>
                                <Button size="xs">XS size</Button>
                            </VStack>
                        </VStack>
                        {/* Headings */}
                        <VStack gap={10}>
                            <Text bold>Heading</Text>
                            <VStack gap={5}>
                                <Text>Heading 1</Text>
                                <Text size={'m'}>Heading 2</Text>
                            </VStack>
                        </VStack>
                        {/* Text Colors */}
                        <VStack gap={10}>
                            <Text bold>Text Colors</Text>
                            <VStack gap={5}>
                                <Text variant="caption">Cation</Text>
                                <Text variant="error">Error</Text>
                                <Text variant="light">Light</Text>
                                <Text variant="primary">Primary</Text>
                                <Text variant="secondary">Secondary</Text>
                            </VStack>
                        </VStack>
                        {/* Checkboxes */}
                        <VStack gap={10}>
                            <Text bold>Checkboxes</Text>
                            <VStack gap={5}>
                                <Checkbox>Not Checked</Checkbox>
                                <Checkbox checked>Checked</Checkbox>
                            </VStack>
                        </VStack>

                        {/* Select */}
                        <VStack gap={10}>
                            <Text bold>Select</Text>
                            <Select
                                onValueChange={() => console.log('jhjh')}
                                options={[
                                    { label: 'First Option', value: '1' },
                                    { label: 'Second Option', value: '2' },
                                    { label: 'Third Option', value: '3' },
                                ]}
                                selectedValue="First Option"
                            />
                        </VStack>

                        {/* TextField */}
                        <VStack gap={10}>
                            <Text bold>TextField</Text>
                            <TextField
                                label="Default"
                                onChange={() => console.log('1212')}
                                placeholder="Default placeholder"
                                value=""
                            />
                            <TextField
                                label="Error"
                                onChange={() => console.log('1212')}
                                placeholder="Error placeholder"
                                value=""
                                error="oops"
                            />
                        </VStack>

                        {/* ToggleSwitcher */}
                        <VStack gap={10}>
                            <Text bold>ToggleSwitcher</Text>
                            <ToggleSwitcher />
                            <ToggleSwitcher checked />
                        </VStack>

                        {/* Modal */}
                        <VStack gap={10}>
                            <Text bold>Modal</Text>
                            <Button onPress={() => setIsOpen((prev) => !prev)}>Open Modal</Button>
                            <Modal title="Modal" onClose={() => setIsOpen((prev) => !prev)} visible={isOpen}>
                                <Text size={'m'}>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci consequatur
                                    autem, eos ipsum quisquam repellendus, deserunt alias laudantium fugiat omnis beatae
                                    laborum tempora vitae delectus optio dolor inventore voluptatem reiciendis!
                                </Text>
                            </Modal>
                        </VStack>
                    </VStack>
                </ScrollView>
            </Paper>
        </AuthProvider>
    )
}
