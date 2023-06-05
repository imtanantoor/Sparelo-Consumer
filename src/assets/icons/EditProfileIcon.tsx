import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"

const EditProfileIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={18}
    fill="none"
    {...props}
  >
    <G
      opacity={0.5}
      stroke="#D00606"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.088 2.995H2.794c-.836 0-1.513.677-1.513 1.513v10.588c0 .836.677 1.513 1.513 1.513h10.588c.836 0 1.513-.677 1.513-1.513V9.803" />
      <Path d="M13.76 1.86a1.604 1.604 0 1 1 2.27 2.27l-7.186 7.185-3.025.756.756-3.025 7.186-7.185Z" />
    </G>
  </Svg>
)

export default EditProfileIcon
