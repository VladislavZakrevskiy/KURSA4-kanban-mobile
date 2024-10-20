import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={14.849} height={14.85} fill="none" {...props}>
        <Path fill="#828FA3" d="m12.728 0 2.121 2.121L2.121 14.85l-2.12-2.121z" />
        <Path d="m12.728 0 2.121 2.121L2.121 14.85l-2.12-2.121z" />
        <Path fill="#828FA3" d="M0 2.121 2.12 0 14.85 12.728l-2.121 2.12z" />
        <Path d="M0 2.121 2.12 0 14.85 12.728l-2.121 2.12z" />
    </Svg>
)
export { SvgComponent as Cross }
