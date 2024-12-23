import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={15} height={15} fill="none" {...props}>
        <Path
            fill="#828FA3"
            fillRule="evenodd"
            d="M14.965 10.27c.17-.404-.316-.75-.723-.569a6.413 6.413 0 0 1-2.585.54c-3.487 0-6.314-2.77-6.314-6.187a6.07 6.07 0 0 1 .945-3.26c.237-.372-.047-.889-.48-.78C2.467.868 0 3.845 0 7.385 0 11.592 3.48 15 7.772 15c3.25 0 6.033-1.954 7.193-4.73ZM9.835.76c-.294-.442.232-.968.674-.673l.788.525a1.944 1.944 0 0 0 2.156 0l.787-.525c.443-.295.97.231.674.673l-.525.788a1.943 1.943 0 0 0 0 2.156l.525.788c.295.442-.231.968-.673.673l-.788-.524a1.937 1.937 0 0 0-2.156 0l-.787.524c-.442.295-.97-.231-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.156L9.835.759Z"
            clipRule="evenodd"
        />
    </Svg>
)
export { SvgComponent as Moon }
