import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
const MyGarageIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h16v15.289H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.00781 0 0 .00818 0 -.023)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={128}
        height={128}
      />
    </Defs>
  </Svg>
)
export default MyGarageIcon
