import * as React from "react"
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Circle
        cx={8.5}
        cy={8.7}
        r={7.5}
        stroke="#CCC"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <G filter="url(#b)">
      <Path
        d="m17.719 17.919-4.04-4.04"
        stroke="#CCC"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs></Defs>
  </Svg>
)

export default SearchIcon
