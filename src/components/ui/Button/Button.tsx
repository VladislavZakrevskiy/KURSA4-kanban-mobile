import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import React, { ReactNode } from 'react'
import { StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import { Text } from '../Text/Text'
import { getPaddingByCss } from '@/src/lib/helpers/getCssPadding'

interface ButtonProps {
    children: ReactNode
    onPress?: () => void
    disabled?: boolean
    loading?: boolean
    style?: object
    variant?: 'primary' | 'secondary' | 'error'
    size?: 'xl' | 'l' | 'm' | 's' | 'xs'
    max?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    disabled = false,
    loading = false,
    style = {},
    variant = 'primary',
    size = 'm',
    max,
}) => {
    const { theme } = useAppSelector((state) => state.theme)

    const variantStyles: Record<'primary' | 'secondary' | 'error', { bg: string; active: string; text: string }> = {
        primary: {
            bg: theme.background.button.primary.default,
            active: theme.background.button.primary.hover,
            text: theme.text.light,
        },

        secondary: {
            bg: theme.background.button.secondary.default,
            active: theme.background.button.secondary.hover,
            text: theme.text.secondary,
        },

        error: {
            bg: theme.background.button.error.default,
            active: theme.background.button.error.hover,
            text: theme.text.light,
        },
    }

    const sizeStyles: Record<'xl' | 'l' | 'm' | 's' | 'xs', object> = {
        xl: getPaddingByCss('15 18'),
        l: getPaddingByCss('10 18'),
        m: getPaddingByCss('10'),
        s: getPaddingByCss('8 10'),
        xs: getPaddingByCss('6 8'),
    }

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: max ? '100%' : 'auto',
                    backgroundColor: pressed ? variantStyles[variant].active : variantStyles[variant].bg,
                    opacity: disabled ? 0.5 : 1,
                    ...sizeStyles[size],
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={variantStyles[variant].text} />
            ) : (
                <Text color={variantStyles[variant].text}>{children}</Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 24,
    },
})
