import { View, ViewStyle, StyleProp } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'

interface PaperProps {
    variant?: 'primary' | 'secondary'
    children: ReactNode
    style?: StyleProp<ViewStyle>
}

export const Paper: FC<PaperProps> = ({ children, variant = 'primary', style }) => {
    const { theme } = useAppSelector((state) => state.theme)
    return <View style={[style, { backgroundColor: theme.background.paper[variant] }]}>{children}</View>
}
