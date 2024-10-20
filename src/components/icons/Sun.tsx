import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
    <Svg width={18.333} height={18.333} fill="none" {...props}>
        <Path
            fill="#828FA3"
            fillRule="evenodd"
            d="M9.756.244a.833.833 0 0 0-1.423.589v.834a.833.833 0 0 0 1.667 0V.833a.833.833 0 0 0-.244-.589ZM2.5 1.667a.833.833 0 0 0-.59 1.422l1.25 1.25a.831.831 0 0 0 1.413-.592V3.74a.832.832 0 0 0-.234-.579l-1.25-1.25a.833.833 0 0 0-.589-.244Zm14.166.833a.834.834 0 0 0-1.422-.589l-1.25 1.25a.829.829 0 0 0-.254.592v.008a.835.835 0 0 0 1.162.765.833.833 0 0 0 .27-.187l1.25-1.25a.834.834 0 0 0 .244-.589ZM6.22 6.22a4.167 4.167 0 1 1 5.892 5.894A4.167 4.167 0 0 1 6.22 6.22ZM.244 8.577A.834.834 0 0 0 .834 10h.833a.833.833 0 0 0 0-1.667H.833a.833.833 0 0 0-.589.244Zm15.833 0a.833.833 0 0 0 .59 1.423h.833a.834.834 0 0 0 0-1.667h-.833a.834.834 0 0 0-.59.244ZM4.583 14.583a.833.833 0 0 0-1.422-.589l-1.25 1.25a.834.834 0 0 0-.234.58v.006a.833.833 0 0 0 1.412.593l1.25-1.25a.834.834 0 0 0 .244-.59Zm10-.833a.834.834 0 0 0-.589 1.423l1.25 1.25a.835.835 0 0 0 1.413-.593v-.007a.835.835 0 0 0-.234-.579l-1.25-1.25a.834.834 0 0 0-.59-.244Zm-4.827 2.327a.833.833 0 0 0-1.423.59v.833a.833.833 0 0 0 1.667 0v-.833a.834.834 0 0 0-.244-.59Z"
            clipRule="evenodd"
        />
    </Svg>
)
export { SvgComponent as Sun }
