import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CurrentLocation = (props: SvgProps) => (
  <Svg
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill={props.fill ?? "#D00606"}
      d="M9.3 6.353a3.34 3.34 0 1 0 0 6.682 3.34 3.34 0 0 0 3.34-3.34A3.34 3.34 0 0 0 9.3 6.352Zm7.467 2.506a7.512 7.512 0 0 0-6.632-6.632V.507h-1.67v1.72A7.512 7.512 0 0 0 1.833 8.86H.113v1.67h1.72a7.512 7.512 0 0 0 6.632 6.632v1.72h1.67v-1.72a7.512 7.512 0 0 0 6.632-6.631h1.72V8.86h-1.72ZM9.3 15.541a5.842 5.842 0 0 1-5.847-5.847A5.842 5.842 0 0 1 9.3 3.848a5.842 5.842 0 0 1 5.846 5.846A5.842 5.842 0 0 1 9.3 15.541Z"
    />
  </Svg>
)
export default CurrentLocation
