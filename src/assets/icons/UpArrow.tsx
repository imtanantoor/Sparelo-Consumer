import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const UpArrow = (props: SvgProps) => (
  <Svg
    width={22}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#005180"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M11.468 1.266 2 10.734"
    />
    <Path
      stroke="#005180"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m11.468 1.266 9.467 9.468"
    />
  </Svg>
)
export default UpArrow
