import * as React from 'react'
import Svg, { SvgProps, Rect } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Rect width={16} height={16} fill="#FFF" rx={2} />
        <Rect width={15} height={15} x={0.5} y={0.5} stroke="#828FA3" strokeOpacity={0.249} rx={2} />
    </Svg>
)
export { SvgComponent as CheckBoxFalse }
