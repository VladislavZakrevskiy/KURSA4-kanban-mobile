import * as React from 'react'
import Svg, { SvgProps, Rect, G } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={24} height={25} fill="none" {...props}>
        <Rect width={6} height={25} fill="#635FC7" rx={2} />
        <Rect width={6} height={25} rx={2} />
        <G
            opacity={0.75}
            style={{
                mixBlendMode: 'normal',
            }}
        >
            <Rect width={6} height={25} x={9} fill="#635FC7" rx={2} />
            <Rect width={6} height={25} x={9} rx={2} />
        </G>
        <G
            opacity={0.5}
            style={{
                mixBlendMode: 'normal',
            }}
        >
            <Rect width={6} height={25} x={18} fill="#635FC7" rx={2} />
            <Rect width={6} height={25} x={18} rx={2} />
        </G>
    </Svg>
)
export { SvgComponent as Logo }
