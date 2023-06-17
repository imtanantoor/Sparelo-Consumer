import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CheckMark = (props: SvgProps) => (
  <Svg
    width={18}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m16.245 2.207-9.467 9.468-4.304-4.303"
    />
  </Svg>
)
export default CheckMark
