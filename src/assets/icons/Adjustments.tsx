import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Adjustments = (props: SvgProps) => (
  <Svg
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      d="M1 13a1 1 0 1 0 0 2h7.268a2 2 0 0 0 3.464 0H13a1 1 0 0 0 0-2h-1.268a2 2 0 0 0-3.464 0H1Zm0-6a1 1 0 1 0 0 2h1.268a2 2 0 0 0 3.464 0H13a1 1 0 1 0 0-2H5.732a2 2 0 0 0-3.464 0H1ZM0 2a1 1 0 0 1 1-1h7.268a2 2 0 0 1 3.464 0H13a1 1 0 1 1 0 2h-1.268a2 2 0 0 1-3.464 0H1a1 1 0 0 1-1-1Z"
      fill="#fff"
    />
  </Svg>
)

export default Adjustments
