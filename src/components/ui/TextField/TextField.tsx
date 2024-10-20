import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { View, Text, TextInput, StyleSheet, ViewStyle, KeyboardTypeOptions, DimensionValue } from 'react-native'
import { VStack } from '../Stack/VStack'
import { FC } from 'react'

interface TextFieldProps {
    label?: string
    value: string
    onChange: (text: string) => void
    placeholder: string
    error?: string
    style?: ViewStyle
    max?: boolean
    type?: KeyboardTypeOptions
    multiline?: boolean
    width?: DimensionValue
}

export const TextField: FC<TextFieldProps> = ({
    label,
    value,
    multiline,
    onChange,
    type,
    placeholder,
    error,
    style,
    max,
    width,
}) => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <VStack gap={8} max={max} style={{ width }}>
            {label && <Text style={{ color: theme.text.caption }}>{label}</Text>}

            <View
                style={[styles.inputContainer, { borderWidth: 1, borderColor: error ? theme.text.error : '#818fa3c6' }]}
            >
                <TextInput
                    multiline={multiline}
                    keyboardType={type}
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    style={[style, { color: theme.text.primary, fontSize: 16 }]}
                    placeholderTextColor={theme.text.textFieldPlaceholder}
                />
                {error && (
                    <Text
                        style={{
                            color: theme.text.error,
                            position: 'absolute',
                            right: 16,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        {error}
                    </Text>
                )}
            </View>
        </VStack>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
})
