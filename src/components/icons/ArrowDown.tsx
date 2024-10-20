import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={9.414} height={6.121} fill="none" {...props}>
        <Path stroke="#635FC7" strokeWidth={2} d="m.7.7 4 4 4-4" />
    </Svg>
)
export { SvgComponent as ArrowDown }
