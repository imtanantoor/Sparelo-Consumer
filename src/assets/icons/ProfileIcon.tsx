import * as React from "react"
import Svg, { SvgProps, G, Path, Ellipse, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const ProfileIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M18.873 19.113v-2.012c0-2.223-1.902-4.025-4.25-4.025H6.126c-2.347 0-4.25 1.802-4.25 4.025v2.012"
        stroke={props?.stroke ?? "#77838F"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <G filter="url(#b)">
      <Ellipse
        cx={10.374}
        cy={5.025}
        rx={4.249}
        ry={4.025}
        stroke={props?.stroke ?? "#77838F"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs></Defs>
  </Svg>
)

export default ProfileIcon
