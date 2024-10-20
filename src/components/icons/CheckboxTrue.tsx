import * as React from 'react'
import Svg, { SvgProps, Rect, Path } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Rect width={16} height={16} fill="#635FC7" rx={2} />
        <Rect width={16} height={16} rx={2} />
        <Path stroke="#FFF" strokeWidth={2} d="m4.27 8.06 2.76 2.76 5-5" />
    </Svg>
)
export { SvgComponent as CheckBoxTrue }
