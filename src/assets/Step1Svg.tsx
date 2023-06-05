import * as React from "react"
import Svg, { SvgProps, G, Ellipse, Path, Circle, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Step1SVG = (props: SvgProps) => (
  <Svg
    width={306}
    height={353}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Ellipse
        cx={66.829}
        cy={269.625}
        rx={2.825}
        ry={4.061}
        transform="rotate(-81.722 66.829 269.625)"
        fill="#fff"
      />
      <Ellipse
        cx={93.255}
        cy={267.047}
        rx={2.825}
        ry={4.061}
        transform="rotate(-81.722 93.255 267.047)"
        fill="#3F3D56"
      />
      <Ellipse
        cx={59.593}
        cy={248.232}
        rx={2.825}
        ry={4.061}
        transform="rotate(-81.722 59.593 248.232)"
        fill="#FF6584"
      />
      <Ellipse
        cx={48.238}
        cy={238.565}
        rx={2.567}
        ry={1.785}
        transform="rotate(-89.567 48.238 238.565)"
        fill="#E6E6E6"
      />
      <Ellipse
        cx={44.344}
        cy={222.242}
        rx={2.567}
        ry={1.785}
        transform="rotate(-89.567 44.344 222.242)"
        fill="#3F3D56"
      />
      <Ellipse
        cx={74.625}
        cy={250.968}
        rx={2.567}
        ry={1.785}
        transform="rotate(-89.567 74.625 250.968)"
        fill="#E6E6E6"
      />
      <Ellipse
        cx={61.855}
        cy={257.344}
        rx={2.567}
        ry={1.785}
        transform="rotate(-89.567 61.855 257.344)"
        fill="#FF6584"
      />
      <Ellipse
        cx={79.631}
        cy={269.129}
        rx={2.567}
        ry={1.785}
        transform="rotate(-89.567 79.631 269.129)"
        fill="#3F3D56"
      />
      <Path
        d="M301.101 90.21a84.29 84.29 0 0 1-21.627 56.497v.011a86.591 86.591 0 0 1-6.241 6.265 83.478 83.478 0 0 1-7.025 5.7 80.406 80.406 0 0 1-5.251 3.524 81.14 81.14 0 0 1-6.576 3.674 79.736 79.736 0 0 1-5.113 2.349 84.492 84.492 0 0 1-32.786 6.598 84.439 84.439 0 0 1-18.897-2.119 80.904 80.904 0 0 1-8.476-2.418 65.976 65.976 0 0 1-3.201-1.163 83.496 83.496 0 0 1-18.138-9.731c-32.797-23.091-44.876-66.036-28.925-102.838 15.95-36.803 55.547-57.35 94.822-49.205 39.275 8.145 67.435 42.745 67.434 82.856Z"
        fill="#F2F2F2"
      />
      <Path
        d="M67.774 153.008a36.091 36.091 0 0 0-25.89-10.568l-.384.001a36.964 36.964 0 0 1-18.638-5.033l-.589-.343.474-.489a36.024 36.024 0 0 0 6.355-8.997 10.894 10.894 0 0 1-8.794 2.841 11.16 11.16 0 0 1-8.191-5.246C8.642 119.536 4.5 111.536 4.5 105.441a37.084 37.084 0 0 1 12.099-27.364 23.092 23.092 0 0 0 7.628-17.219l-.002-.462c0-4.28.523-8.536 1.556-12.681l.104-.411.43.015a35.402 35.402 0 0 0 8.28-.694 27.946 27.946 0 0 1-7.426-1.974l-.463-.188.157-.475c10.84-6.71 35.307-3.235 49.508-35.727 11.516-26.347 52.146 23.387 52.146 52.135 0 2.934-2.903 6.81-.73 8.749 23.493 20.959 7.283 34.417 2.173 47.959-1.213 3.214 1.416 6.741 1.416 10.217 0 .59-.015 1.199-.044 1.81l-.046.939-.783-.521a25.945 25.945 0 0 1-4.285-3.515 22.61 22.61 0 0 1-.717 19.52c-2.462 4.647-4.844 7.974-7.079 9.887-14.866 12.722-37.07 11.655-50.648-2.433Z"
        fill="#E6E6E6"
      />
      <Path
        d="M107.106 222.915a.665.665 0 0 0 .658-.572 222.755 222.755 0 0 0 .31-46.71c-2.297-24.512-9.672-59.817-31.766-88.813a.666.666 0 0 0-1.059.806c21.904 28.746 29.22 63.792 31.5 88.131a221.286 221.286 0 0 1-.303 46.399.665.665 0 0 0 .66.759Z"
        fill="#3F3D56"
      />
      <Path
        d="M89.076 127.72a.666.666 0 0 0 .392-1.204 91.72 91.72 0 0 0-20.246-10.306c-11.17-4.09-28.156-7.797-45.643-2.232a.666.666 0 0 0 .404 1.268c17.128-5.451 33.806-1.805 44.781 2.213a90.196 90.196 0 0 1 19.922 10.134c.113.082.25.127.39.127ZM119.53 51.87a.666.666 0 0 0-1.172-.478 91.685 91.685 0 0 0-11.738 19.452c-4.883 10.846-9.804 27.521-5.513 45.363a.666.666 0 1 0 1.294-.311c-4.203-17.476.634-33.849 5.433-44.506a90.155 90.155 0 0 1 11.541-19.14.66.66 0 0 0 .155-.38Z"
        fill="#3F3D56"
      />
    </G>
    <G filter="url(#b)">
      <Path
        d="M192.619 224.703 81.212 253.392c-7.868 2.017-15.885-2.716-17.919-10.58L29.601 111.973c-2.017-7.868 2.716-15.885 10.58-17.92l103.646-26.69 26.528 11.877L203.2 206.784c2.016 7.869-2.717 15.885-10.581 17.919Z"
        fill="#F2F2F2"
      />
      <Path
        d="M41.237 98.156c-5.6 1.449-8.97 7.157-7.534 12.761l33.692 130.838c1.45 5.6 7.158 8.971 12.761 7.535l111.407-28.689c5.6-1.449 8.971-7.157 7.535-12.761L166.762 82.272l-23.313-10.437L41.237 98.156Z"
        fill="#fff"
      />
      <Path
        d="m170.072 79.915-17.242 4.44a4.9 4.9 0 0 1-5.968-3.524l-3.279-12.735a.306.306 0 0 1 .421-.356l26.116 11.598a.306.306 0 0 1-.048.577Z"
        fill="#F2F2F2"
      />
      <Path
        d="M161.002 191.648 110.28 204.71a2.45 2.45 0 0 1-1.222-4.746l50.722-13.062a2.45 2.45 0 1 1 1.222 4.746ZM172.853 197.136l-60.511 15.582a2.45 2.45 0 1 1-1.222-4.746l60.511-15.582a2.45 2.45 0 0 1 1.222 4.746Z"
        fill="#CCC"
      />
      <Circle cx={89.578} cy={211.78} r={8.661} fill="#E6E6E6" />
      <Path
        d="m155.608 168.982-67.364 17.341a7.59 7.59 0 0 1-9.23-5.451L64.896 126.03a7.588 7.588 0 0 1 5.45-9.23l67.365-17.34a7.588 7.588 0 0 1 9.23 5.451l14.117 54.841a7.588 7.588 0 0 1-5.451 9.23Z"
        fill="#fff"
      />
      <Path
        d="m155.608 168.982-67.364 17.341a7.59 7.59 0 0 1-9.23-5.451L64.896 126.03a7.588 7.588 0 0 1 5.45-9.23l67.365-17.34a7.588 7.588 0 0 1 9.23 5.451l14.117 54.841a7.588 7.588 0 0 1-5.451 9.23ZM70.57 117.663a6.696 6.696 0 0 0-4.81 8.145l14.117 54.841a6.695 6.695 0 0 0 8.145 4.81l67.364-17.34a6.697 6.697 0 0 0 4.81-8.145l-14.117-54.841a6.696 6.696 0 0 0-8.145-4.81l-67.364 17.34Z"
        fill="#E6E6E6"
      />
      <Path
        d="m134.295 117.899-33.998 8.752a1.218 1.218 0 0 1-1.475-.767 1.173 1.173 0 0 1 .826-1.489l34.608-8.908c1.398.708 1.03 2.157.038 2.412h.001ZM135.83 123.863l-33.998 8.751a1.218 1.218 0 0 1-1.475-.766 1.173 1.173 0 0 1 .826-1.489l34.608-8.909c1.398.709 1.03 2.157.039 2.413Z"
        fill="#F2F2F2"
      />
      <Path
        d="m95.357 137.901-10.376 2.671a1.32 1.32 0 0 1-1.607-.949l-3.152-12.244a1.32 1.32 0 0 1 .95-1.606l10.375-2.671a1.32 1.32 0 0 1 1.607.948l3.151 12.245a1.32 1.32 0 0 1-.948 1.606Z"
        fill="#E6E6E6"
      />
      <Path
        d="m138.874 136.098-51.886 13.356a1.216 1.216 0 0 1-1.476-.766 1.172 1.172 0 0 1 .826-1.489l52.498-13.513c1.398.708 1.03 2.157.038 2.412ZM140.41 142.063 88.523 155.42a1.218 1.218 0 0 1-1.475-.767 1.174 1.174 0 0 1 .826-1.489l52.497-13.513c1.398.708 1.03 2.157.039 2.412ZM141.944 148.025l-51.887 13.356a1.218 1.218 0 0 1-1.475-.766 1.173 1.173 0 0 1 .826-1.489l52.497-13.514c1.398.709 1.03 2.158.039 2.413ZM143.479 153.989l-51.887 13.357a1.218 1.218 0 0 1-1.475-.767 1.173 1.173 0 0 1 .826-1.489l52.497-13.513c1.398.708 1.03 2.157.039 2.412ZM145.014 159.951l-51.887 13.356a1.216 1.216 0 0 1-1.475-.766 1.172 1.172 0 0 1 .826-1.489l52.497-13.513c1.398.708 1.03 2.157.039 2.412Z"
        fill="#F2F2F2"
      />
      <Path
        d="M90.217 214.816a.9.9 0 0 1-.568-.039l-.011-.005-2.36-1a.904.904 0 1 1 .708-1.665l1.53.651 2.002-4.713a.904.904 0 0 1 1.186-.479v.001l-.011.03.012-.031c.46.196.673.727.478 1.187l-2.357 5.541a.906.906 0 0 1-.608.521v.001Z"
        fill="#fff"
      />
      <Path
        d="M235.351 274.562H120.309c-8.123-.009-14.705-6.591-14.714-14.714V124.741c.009-8.123 6.591-14.706 14.714-14.715h107.028l22.729 18.116v131.706c-.01 8.123-6.592 14.705-14.715 14.714Z"
        fill="#E6E6E6"
      />
      <Path
        d="M120.309 114.262c-5.785.007-10.472 4.694-10.479 10.479v135.107c.007 5.784 4.694 10.472 10.479 10.478H235.35c5.785-.006 10.473-4.694 10.479-10.478V130.183l-19.975-15.921H120.309Z"
        fill="#fff"
      />
      <Path
        d="M212.976 153.548h-52.377a2.451 2.451 0 0 1 0-4.901h52.377a2.45 2.45 0 0 1 0 4.901ZM223.082 161.818h-62.484a2.451 2.451 0 0 1 0-4.901h62.484a2.45 2.45 0 1 1 0 4.901Z"
        fill="#D00606"
      />
      <Path
        d="M212.976 185.708h-52.375a2.45 2.45 0 1 0 0 4.9h52.375a2.45 2.45 0 0 0 0-4.9ZM223.084 193.979h-62.483a2.45 2.45 0 1 0 0 4.9h62.483a2.45 2.45 0 0 0 0-4.9ZM212.976 227.672h-52.377a2.451 2.451 0 0 1 0-4.901h52.377a2.45 2.45 0 0 1 0 4.901ZM223.082 235.942h-62.484a2.451 2.451 0 0 1 0-4.901h62.484a2.45 2.45 0 1 1 0 4.901Z"
        fill="#CCC"
      />
      <Circle cx={138.788} cy={155.233} r={8.661} fill="#D00606" />
      <Path
        d="M137.929 158.536a.896.896 0 0 1-.54-.179l-.01-.008-2.036-1.557a.905.905 0 0 1 1.101-1.435l1.319 1.011 3.115-4.065a.905.905 0 0 1 1.268-.167l-.02.027.02-.027a.906.906 0 0 1 .168 1.268l-3.665 4.778a.905.905 0 0 1-.719.353l-.001.001Z"
        fill="#fff"
      />
      <Path
        d="M148.338 192.294a8.66 8.66 0 0 1-8.659 8.663 1.657 1.657 0 0 1-.223-.009 8.659 8.659 0 0 1-8.437-8.806 8.66 8.66 0 0 1 17.319.152Z"
        fill="#CCC"
      />
      <Circle cx={138.788} cy={229.356} r={8.661} fill="#CCC" />
      <Path
        d="M249.623 128.726h-17.804a4.9 4.9 0 0 1-4.901-4.901v-13.15a.306.306 0 0 1 .497-.24l22.398 17.744a.307.307 0 0 1-.19.547Z"
        fill="#CCC"
      />
      <Path
        d="M148.338 192.293a8.66 8.66 0 0 1-8.659 8.664 1.664 1.664 0 0 1-.223-.009 18.751 18.751 0 0 1 1.681-17.194 8.665 8.665 0 0 1 7.201 8.539ZM158.147 188.16a2.458 2.458 0 0 1 2.453-2.452h13.051c.763 1.55 1.304 3.2 1.61 4.9H160.6a2.454 2.454 0 0 1-2.453-2.447v-.001ZM175.565 193.979a18.683 18.683 0 0 1-.651 4.9h-14.313a2.451 2.451 0 1 1 0-4.9h14.964Z"
        fill="#D00606"
      />
      <Path
        d="M207.857 224.201a2.676 2.676 0 0 1-3.677.891l-31.215-19.04a2.676 2.676 0 1 1 2.787-4.568l31.215 19.04a2.675 2.675 0 0 1 .89 3.677Z"
        fill="#3F3D56"
      />
      <Path
        d="M176.642 205.161c-6.155 10.091-19.326 13.282-29.417 7.127-10.092-6.156-13.283-19.326-7.127-29.418 6.155-10.091 19.326-13.282 29.417-7.127 10.08 6.164 13.268 19.324 7.127 29.418Zm-31.976-19.504c-4.617 7.568-2.224 17.446 5.345 22.063 7.569 4.616 17.447 2.223 22.063-5.345 4.617-7.569 2.224-17.447-5.345-22.064-7.57-4.605-17.44-2.214-22.063 5.346Z"
        fill="#3F3D56"
      />
      <Circle cx={245.217} cy={186.496} r={10.952} fill="#A0616A" />
      <Path
        d="M244.51 247.892a4.905 4.905 0 0 1 3.711-6.31c.215-.042.432-.069.651-.08l11.536-18.516-10.538-10.017a4.205 4.205 0 1 1 5.851-6.044l14.549 14.347.029.035a3.81 3.81 0 0 1-.265 4.542l-16.164 19.117c.049.153.089.309.121.466a4.906 4.906 0 0 1-4.819 5.867 4.92 4.92 0 0 1-4.662-3.407ZM227.18 338.916h-5.466l-2.601-21.086 8.068.001-.001 21.085Z"
        fill="#A0616A"
      />
      <Path
        d="m228.574 344.215-17.627-.001v-.223a6.86 6.86 0 0 1 6.861-6.86h10.766v7.084Z"
        fill="#2F2E41"
      />
      <Path
        d="m281.515 331.357-4.697 2.797-13.022-16.786 6.932-4.128 10.787 18.117Z"
        fill="#A0616A"
      />
      <Path
        d="m285.425 335.197-15.146 9.018-.114-.192a6.861 6.861 0 0 1 2.385-9.405h.001l9.25-5.507 3.624 6.086ZM218.423 329.63c-3.662-43.121-5.841-83.18 7.547-99.521l.103-.127 22.529 9.012.038.08c.075.166 7.568 16.647 5.82 27.733l5.557 25.562 18.12 30.34a2.007 2.007 0 0 1-.915 2.866l-7.874 3.464c-.918.4-1.991.065-2.518-.787l-19.711-32.141-11.133-24.651a.669.669 0 0 0-1.275.204l-6.171 58.01a2.003 2.003 0 0 1-1.995 1.794h-6.122a2.02 2.02 0 0 1-2-1.838Z"
        fill="#2F2E41"
      />
      <Path
        d="m226.045 230.45-.107-.051-.017-.118c-.841-5.89.155-12.435 2.961-19.452a15.445 15.445 0 0 1 17.926-9.25 15.429 15.429 0 0 1 9.837 7.565 15.263 15.263 0 0 1 1.058 12.228c-3.538 10.345-8.127 20.024-8.173 20.121l-.096.202-23.389-11.245Z"
        fill="#D00606"
      />
      <Path
        d="M201.465 215.779a4.906 4.906 0 0 1 7.21 1.266c.115.186.216.381.303.581l21.383 4.322 5.693-13.378a4.206 4.206 0 0 1 7.709 3.363l-8.342 18.652-.024.04a3.809 3.809 0 0 1-4.346 1.342l-23.567-8.445a4.657 4.657 0 0 1-.395.276 4.908 4.908 0 0 1-7.183-2.46 4.922 4.922 0 0 1 1.559-5.559Z"
        fill="#A0616A"
      />
      <Path
        d="M284.781 198.224c-1.055-1.869-2.592-3.581-4.624-4.272-2.624-.892-5.465.058-8.163.692-2.078.489-4.25.788-6.345.375-2.095-.412-4.116-1.631-5.069-3.542-1.403-2.811-.221-6.162-.307-9.302a11.293 11.293 0 0 0-14.234-10.617c-2.583-.746-4.922-.815-6.52 1.171a7.581 7.581 0 0 0-7.581 7.58h7.249a7.2 7.2 0 0 0 1.094 5.32c1.279 1.88 3.504 3.24 3.933 5.473.415 2.164-1.056 4.218-2.599 5.791-1.544 1.573-3.334 3.132-3.815 5.282a6.545 6.545 0 0 0 .938 4.711 15.332 15.332 0 0 0 3.293 3.628 48.346 48.346 0 0 0 20.082 10.273c5.219 1.257 10.927 1.582 15.772-.729a15.66 15.66 0 0 0 6.896-21.834Z"
        fill="#2F2E41"
      />
      <Path
        d="M286.418 344.679h-84.721a.446.446 0 0 1 0-.892h84.721a.446.446 0 0 1 0 .892Z"
        fill="#CCC"
      />
    </G>
    <Defs></Defs>
  </Svg>
)

export default Step1SVG
