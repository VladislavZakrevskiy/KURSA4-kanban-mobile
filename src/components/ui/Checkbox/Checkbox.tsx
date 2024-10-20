import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { FC, ReactNode } from 'react'
import { HStack } from '../Stack/HStack'
import { Text } from '../Text/Text'
import { CheckBoxTrue } from '../../icons/CheckboxTrue'
import { CheckBoxFalse } from '../../icons/CheckboxFalse'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'

interface CheckboxProps {
    checked?: boolean
    onChange?: (newValue: boolean) => void
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    children?: ReactNode
    loading?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
    checked,
    onChange,
    disabled = false,
    loading,
    variant = 'primary',
    children,
}) => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <Pressable
            style={({ pressed }) => [
                disabled && styles.disabled,
                {
                    padding: 12,
                    borderRadius: 4,
                    backgroundColor: pressed ? theme.background.checkbox.hover : theme.background.checkbox.checked,
                },
            ]}
            onPress={() => !disabled && onChange?.(!checked)}
        >
            <HStack align="center" justify="flex-start" gap={16}>
                {loading && <ActivityIndicator color={theme.background.button.primary.default} />}
                {checked && !loading && <CheckBoxTrue />}
                {!checked && !loading && <CheckBoxFalse />}
                <Text bold variant={variant}>
                    {children}
                </Text>
            </HStack>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.7,
    },
})
