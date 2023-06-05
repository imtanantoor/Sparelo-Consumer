import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const AddToGarageButtonSVG = (props: SvgProps) => (
  <Svg
    width={90}
    height={90}
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M45 90a45 45 0 1 0 0-90 45 45 0 0 0 0 90Zm5.625-61.875a5.625 5.625 0 1 0-11.25 0v11.25h-11.25a5.625 5.625 0 1 0 0 11.25h11.25v11.25a5.625 5.625 0 1 0 11.25 0v-11.25h11.25a5.625 5.625 0 1 0 0-11.25h-11.25v-11.25Z"
      fill="#075281"
    />
  </Svg>
)

export default AddToGarageButtonSVG
