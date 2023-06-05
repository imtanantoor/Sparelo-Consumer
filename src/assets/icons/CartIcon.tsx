import * as React from "react"
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const CartIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M1 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3Z"
        stroke={props?.stroke ?? "#3C3A35"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <G filter="url(#b)">
      <Path
        d="M12.333 5.5c0 2.485-1.492 4.5-3.333 4.5-1.84 0-3.333-2.015-3.333-4.5"
        stroke={props?.stroke ?? "#3C3A35"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs></Defs>
  </Svg>
)

export default CartIcon
