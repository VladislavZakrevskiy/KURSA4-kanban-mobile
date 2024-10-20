import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { VStack } from '../Stack/VStack'
import { Text } from '../Text/Text'

interface SelectProps {
    options: { label: string; value: string }[]
    selectedValue: string
    onValueChange: (value: string) => void
    placeholder?: string
    label?: string
    disable?: boolean
}
export const Select: React.FC<SelectProps> = ({
    options,
    selectedValue,
    onValueChange,
    placeholder = 'Choose value',
    label,
    disable,
}) => {
    const { theme } = useAppSelector((state) => state.theme)
    const [isFocus, setIsFocus] = useState(false)

    return (
        <VStack gap={8}>
            <Text variant="caption">{label}</Text>
            <Dropdown
                disable={disable}
                data={options}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={selectedValue}
                onBlur={() => setIsFocus(false)}
                onFocus={() => setIsFocus(true)}
                onChange={(item) => {
                    onValueChange(item.value)
                }}
                placeholderStyle={{ color: theme.text.textFieldPlaceholder }}
                style={{
                    opacity: disable ? 0.5 : 1,
                    paddingTop: 12,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 12,
                    borderWidth: 1,
                    borderColor: isFocus ? theme.background.button.primary.default : '#828FA340',
                    borderRadius: 6,
                    backgroundColor: theme.background.paper.primary,
                }}
                selectedTextStyle={{
                    fontSize: theme.textSizes.heading.m,
                    color: theme.text.primary,
                    backgroundColor: theme.background.select.option,
                }}
                itemTextStyle={{ color: theme.text.textFieldPlaceholder, fontSize: 13 }}
                containerStyle={{ backgroundColor: theme.background.select.option, borderRadius: 8 }}
            />
        </VStack>
    )
}
