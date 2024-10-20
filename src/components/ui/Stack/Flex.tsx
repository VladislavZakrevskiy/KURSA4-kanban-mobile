import { FC } from 'react'
import { View, ViewProps, FlexAlignType } from 'react-native'

export interface FlexProps extends ViewProps {
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    align?: FlexAlignType
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    gap?: number
    max?: boolean
}

export const Flex: FC<FlexProps> = ({ justify, align, direction, gap, max, style, ...props }) => {
    return (
        <View
            style={[
                {
                    display: 'flex',
                    justifyContent: justify,
                    alignItems: align,
                    flexDirection: direction,
                    gap,
                    width: max ? '100%' : 'auto',
                },
                style,
            ]}
            {...props}
        />
    )
}
