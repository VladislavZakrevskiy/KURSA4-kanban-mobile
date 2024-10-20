import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import React from 'react'
import { Text as RNText } from 'react-native'

export interface TextProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'error' | 'caption' | 'light'
    color?: string
    size?: 'xl' | 'l' | 'm' | number
    style?: object
    bold?: boolean | number
}

export const Text: React.FC<TextProps> = ({ children, variant = 'primary', size = 'l', color, style = {}, bold }) => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <RNText
            style={[
                {
                    fontWeight: typeof bold === 'boolean' ? 700 : bold,
                    color: color ? color : theme.text[variant],
                    fontSize: typeof size === 'string' ? theme.textSizes.heading[size] : size,
                },
                style,
            ]}
        >
            {children}
        </RNText>
    )
}
