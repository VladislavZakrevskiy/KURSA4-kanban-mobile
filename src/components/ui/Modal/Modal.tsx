import React, { ReactNode } from 'react'
import {
    Modal as RNModal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Paper } from '../Paper/Paper'
import { Text } from '../Text/Text'
import { HStack } from '../Stack/HStack'

interface ModalProps {
    visible: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    after?: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children, title, after }) => {
    return (
        <RNModal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={-200}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContainer}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Paper variant="secondary" style={styles.content}>
                                    {title && (
                                        <HStack justify="space-between" style={{ marginBottom: 24 }}>
                                            <Text size={'xl'} bold>
                                                {title}
                                            </Text>
                                            {after}
                                        </HStack>
                                    )}
                                    {children}
                                </Paper>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalView: {
        width: 350,
        maxHeight: '80%',
        elevation: 5,
        zIndex: 5,
    },
    content: {
        padding: 24,
        borderRadius: 20,
    },
})
