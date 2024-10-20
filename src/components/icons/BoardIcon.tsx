import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Path
            fill={props.fill || '#635FC7'}
            fillRule="evenodd"
            d="M0 2.889A2.89 2.89 0 0 1 2.889 0H13.11A2.891 2.891 0 0 1 16 2.889V13.11A2.89 2.89 0 0 1 13.111 16H2.89A2.892 2.892 0 0 1 0 13.111V2.89ZM9.778 7.11V1.333h-6.89a1.554 1.554 0 0 0-1.555 1.556V7.11h8.445Zm4.889-4.222v1.555H11.11V1.333h2a1.555 1.555 0 0 1 1.556 1.556ZM11.11 5.777h3.556v4.446H11.11V5.777Zm-9.778 7.334V8.444h8.445v6.223h-6.89a1.557 1.557 0 0 1-1.555-1.556Zm13.334-1.555H11.11v3.111h2a1.555 1.555 0 0 0 1.556-1.556v-1.555Z"
            clipRule="evenodd"
        />
    </Svg>
)
export { SvgComponent as BoardIcon }
