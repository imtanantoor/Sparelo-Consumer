import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const PauseIcon = (props: SvgProps) => (
  <Svg
    width={14.619}
    height={21.929}
    {...props}
  >
    <G data-name="211871_pause_icon">
      <Path
        d="M5.482 21.232V.691a.691.691 0 0 0-.7-.691H.7a.691.691 0 0 0-.7.691v20.541a.7.7 0 0 0 .7.7h4.089a.692.692 0 0 0 .693-.7Z"
        data-name="Path 1"
      />
      <Path
        d="M13.922 0H9.837a.7.7 0 0 0-.7.691v20.541a.7.7 0 0 0 .7.7h4.089a.7.7 0 0 0 .7-.7V.691A.691.691 0 0 0 13.922 0Z"
        data-name="Path 2"
      />
    </G>
  </Svg>
)
export default PauseIcon
