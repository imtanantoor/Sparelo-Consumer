import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BackIcon = (props: SvgProps) => (
  <Svg
    width={13}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      d="M10.5 19.167 2.333 11 10.5 2.833"
      stroke="#005180"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default BackIcon
