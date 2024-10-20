import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface CardProps {
    children: React.ReactNode
    style?: ViewStyle
    variant?: 'primary' | 'secondary'
}

export const Card: React.FC<CardProps> = ({ children, style = {}, variant = 'primary' }) => {
    const { theme } = useAppSelector((state) => state.theme)
    return (
        <View
            style={[
                {
                    borderRadius: 8,
                    backgroundColor: theme.background.card[variant],
                    shadowColor: '#364E7E',
                    shadowOffset: { height: 4, width: 0 },
                    shadowOpacity: 6,
                },
                style,
            ]}
        >
            {children}
        </View>
    )
}
